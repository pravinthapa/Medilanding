import Doctor from '../models/Doctor.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const parseBody = (body) => {
  const data = { ...body };
  if (data.availability && typeof data.availability === 'string') {
    data.availability = JSON.parse(data.availability);
  }
  if (data.experience) data.experience = Number(data.experience);
  if (data.isActive !== undefined) data.isActive = data.isActive === 'true' || data.isActive === true;
  return data;
};

export const getDoctors = asyncHandler(async (req, res) => {
  const filter = req.user ? {} : { isActive: true };
  const doctors = await Doctor.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: doctors });
});

export const getDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    res.status(404);
    throw new Error('Doctor not found');
  }
  res.json({ success: true, data: doctor });
});

export const createDoctor = asyncHandler(async (req, res) => {
  const data = parseBody(req.body);
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  const doctor = await Doctor.create(data);
  res.status(201).json({ success: true, data: doctor });
});

export const updateDoctor = asyncHandler(async (req, res) => {
  const data = parseBody(req.body);
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  if (!doctor) {
    res.status(404);
    throw new Error('Doctor not found');
  }
  res.json({ success: true, data: doctor });
});

export const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id);
  if (!doctor) {
    res.status(404);
    throw new Error('Doctor not found');
  }
  res.json({ success: true, message: 'Doctor deleted' });
});
