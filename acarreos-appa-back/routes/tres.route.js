import {Router} from 'express';
import { tresController } from '../controllers/tres.controller.js';

const router = Router();

router.post("/getOrderCost",tresController.quoteOrder);

export default router;