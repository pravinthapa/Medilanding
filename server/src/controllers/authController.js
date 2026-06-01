import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateToken } from '../utils/generateToken.js';

const googleClient = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) return null;
  return new OAuth2Client(clientId);
};

const isRegisterAllowed = async () => {
  if (process.env.ALLOW_ADMIN_REGISTER === 'true') return true;
  const count = await User.countDocuments();
  return count === 0;
};

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  authProvider: user.authProvider,
});

export const getRegisterStatus = asyncHandler(async (_req, res) => {
  res.json({
    success: true,
    data: {
      allowed: await isRegisterAllowed(),
      googleEnabled: Boolean(process.env.GOOGLE_CLIENT_ID),
    },
  });
});

export const register = asyncHandler(async (req, res) => {
  if (!(await isRegisterAllowed())) {
    res.status(403);
    throw new Error('Admin registration is disabled. Set ALLOW_ADMIN_REGISTER=true in server/.env');
  }

  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error('An account with this email already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    authProvider: 'local',
    role: 'admin',
  });
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    data: { token, user: formatUser(user) },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  if (user.authProvider === 'google' && !user.password) {
    res.status(401);
    throw new Error('This account uses Google sign-in. Please use Continue with Google.');
  }

  if (!(await user.comparePassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    data: { token, user: formatUser(user) },
  });
});

export const googleAuth = asyncHandler(async (req, res) => {
  const client = googleClient();
  if (!client) {
    res.status(503);
    throw new Error('Google login is not configured on the server. Add GOOGLE_CLIENT_ID to server/.env');
  }

  const { credential } = req.body;
  if (!credential) {
    res.status(400);
    throw new Error('Google credential is required');
  }

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { sub: googleId, email, name, email_verified } = payload;

  if (!email_verified) {
    res.status(401);
    throw new Error('Google email is not verified');
  }

  let user = await User.findOne({
    $or: [{ googleId }, { email: email.toLowerCase() }],
  }).select('+password');

  if (!user) {
    if (!(await isRegisterAllowed())) {
      res.status(403);
      throw new Error('Registration is disabled. Enable ALLOW_ADMIN_REGISTER in server/.env');
    }
    user = await User.create({
      name: name || email.split('@')[0],
      email: email.toLowerCase(),
      googleId,
      authProvider: 'google',
      role: 'admin',
    });
  } else {
    if (!user.googleId) {
      user.googleId = googleId;
      user.authProvider = 'google';
      await user.save();
    }
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    data: { token, user: formatUser(user) },
  });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: formatUser(req.user) });
});
