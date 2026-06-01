import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  sendAppointmentCreatedToAdmin,
  sendAppointmentConfirmedToPatient,
  sendAppointmentCancelledToPatient,
  sendAppointmentRescheduledToPatient,
} from '../services/emailService.js';

export const createAppointment = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.body.doctorId);
  if (!doctor || !doctor.isActive) {
    res.status(400);
    throw new Error('Invalid or inactive doctor');
  }

  const appointment = await Appointment.create(req.body);
  const populated = await Appointment.findById(appointment._id).populate('doctorId', 'name specialization');

  await sendAppointmentCreatedToAdmin(populated, doctor);

  res.status(201).json({ success: true, data: populated });
});

export const getAppointments = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const appointments = await Appointment.find(filter)
    .populate('doctorId', 'name specialization image')
    .sort({ createdAt: -1 });
  res.json({ success: true, data: appointments });
});

export const getAppointmentStats = asyncHandler(async (req, res) => {
  const [total, pending, confirmed, cancelled, rescheduled] = await Promise.all([
    Appointment.countDocuments(),
    Appointment.countDocuments({ status: 'pending' }),
    Appointment.countDocuments({ status: 'confirmed' }),
    Appointment.countDocuments({ status: 'cancelled' }),
    Appointment.countDocuments({ status: 'rescheduled' }),
  ]);

  const recent = await Appointment.find()
    .populate('doctorId', 'name specialization')
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({
    success: true,
    data: { total, pending, confirmed, cancelled, rescheduled, recent },
  });
});

export const updateAppointment = asyncHandler(async (req, res) => {
  const existing = await Appointment.findById(req.params.id);
  if (!existing) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  const previousStatus = existing.status;
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('doctorId', 'name specialization');

  const doctor = appointment.doctorId;

  if (req.body.status && req.body.status !== previousStatus) {
    if (req.body.status === 'confirmed') {
      await sendAppointmentConfirmedToPatient(appointment, doctor);
    } else if (req.body.status === 'cancelled') {
      await sendAppointmentCancelledToPatient(appointment, doctor);
    } else if (req.body.status === 'rescheduled') {
      await sendAppointmentRescheduledToPatient(appointment, doctor);
    }
  }

  res.json({ success: true, data: appointment });
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }
  res.json({ success: true, message: 'Appointment deleted' });
});
