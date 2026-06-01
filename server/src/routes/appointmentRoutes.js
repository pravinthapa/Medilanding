import { Router } from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentStats,
  updateAppointment,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  createAppointmentValidator,
  updateAppointmentValidator,
} from '../validators/appointmentValidators.js';

const router = Router();

router.post('/', createAppointmentValidator, validate, createAppointment);
router.get('/stats', protect, getAppointmentStats);
router.get('/', protect, getAppointments);
router.put('/:id', protect, updateAppointmentValidator, validate, updateAppointment);
router.delete('/:id', protect, deleteAppointment);

export default router;
