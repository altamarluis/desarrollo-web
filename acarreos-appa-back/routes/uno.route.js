import {Router} from 'express';
import { unoController } from '../controllers/uno.controller.js';

const router = Router();

router.get('/prueba',unoController.getAll);
router.post('/login',unoController.login);
router.post('/registerClient',unoController.registerClient);
router.post('/registerTransporter',unoController.registerTransporter);
router.patch('/updateUser',unoController.update);
router.patch('/changePassword',unoController.changePassword);
router.delete('/deleteUser',unoController.deleteUser);

export default router;