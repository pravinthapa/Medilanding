import { Router } from 'express';
import {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createContactValidator } from '../validators/contactValidators.js';

const router = Router();

router.post('/', createContactValidator, validate, createContact);
router.get('/', protect, getContacts);
router.put('/:id', protect, updateContact);
router.delete('/:id', protect, deleteContact);

export default router;
