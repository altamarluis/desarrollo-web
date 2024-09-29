import {Router} from 'express';
import { dosController } from '../controllers/dos.controller.js';

const router = Router();

router.get('/parameters',dosController.getAll);
router.put('/updateParams',dosController.update);
router.delete('/deleteBison', dosController.deleteBison);
router.get('/bisons',dosController.getAllBisons);

export default router;