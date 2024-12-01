import express from 'express';
import isAdmin from '../middlewares/isAdmin.middleware.js';
import { validateUser } from '../middlewares/validateUser.middleware.js';
import {handleRegisterUser, handleLoginUser} from '../controllers/auth.controller.js';
import { handleGenerateCertificate } from '../controllers/admin.controller.js';
import {upload} from '../middlewares/multer.middleware.js';

const router = express.Router();

router.get('/', (req, res)=>{
    res.send('Welcome to the API');
})
router.post('/register', handleRegisterUser);
router.post('/login', handleLoginUser);
router.post('/generate-certificate', validateUser, isAdmin, upload.single('certificate') , handleGenerateCertificate);

export default router;