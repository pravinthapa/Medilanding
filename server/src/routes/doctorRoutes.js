import { Router } from 'express';
import {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctorController.js';
import { protect } from '../middleware/auth.js';
import { optionalAuth } from '../middleware/optionalAuth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', optionalAuth, getDoctors);
router.get('/:id', getDoctor);
router.post('/', protect, upload.single('image'), createDoctor);
router.put('/:id', protect, upload.single('image'), updateDoctor);
router.delete('/:id', protect, deleteDoctor);

export default router;
