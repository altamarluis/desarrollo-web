import {Router} from 'express';
import { cuatroController } from '../controllers/cuatro.controller.js';

const router = Router();

router.get('/orderStatus', cuatroController.getOrderStatus);
router.get('/clientOrders', cuatroController.getClientOrders);
router.get('/transporterOrders', cuatroController.getTransporterOrders);
router.post('/createOrder',cuatroController.createOrder);
router.patch('/updateOrderStatus',cuatroController.updateOrderStatus);

export default router;