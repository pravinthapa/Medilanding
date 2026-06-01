import { body } from 'express-validator';

export const createAppointmentValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('doctorId').notEmpty().withMessage('Doctor is required'),
  body('date').trim().notEmpty().withMessage('Date is required'),
  body('time').trim().notEmpty().withMessage('Time is required'),
];

export const updateAppointmentValidator = [
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'cancelled', 'rescheduled'])
    .withMessage('Invalid status'),
];
