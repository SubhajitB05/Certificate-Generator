import express from 'express';
import isAdmin from '../middlewares/isAdmin.middleware.js';
import { validateUser } from '../middlewares/validateUser.middleware.js';
import {handleRegisterUser, handleLoginUser} from '../controllers/auth.controller.js';
import { handleGenerateCertificate } from '../controllers/admin.controller.js';

const router = express.Router();


router.post('/register', handleRegisterUser);
router.post('/login', handleLoginUser);
router.post('/generate-certificate', validateUser, isAdmin, handleGenerateCertificate);

export default router;