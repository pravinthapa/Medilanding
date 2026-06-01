import { Router } from 'express';
import { login, register, googleAuth, getMe, getRegisterStatus } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { loginValidator, registerValidator } from '../validators/authValidators.js';

const router = Router();

router.get('/register-status', getRegisterStatus);
router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/google', googleAuth);
router.get('/me', protect, getMe);

export default router;
