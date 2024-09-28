import {Router} from 'express';
import { dosController } from '../controllers/dos.controller.js';

const router = Router();

router.get('/parameters',dosController.getAll);
router.put('/updateParams',dosController.update);

export default router;