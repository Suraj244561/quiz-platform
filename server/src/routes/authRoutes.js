import { Router } from 'express';
import { cmsLogin, studentLogin } from '../controllers/authController.js';

const router = Router();
router.post('/cms/login', cmsLogin);
router.post('/student/login', studentLogin);
export default router;
