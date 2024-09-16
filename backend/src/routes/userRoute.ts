import { Router } from 'express';
import { registerUser, loginUser, getProfileData } from '../controllers/userController';
import { verifyToken } from '../middlerwares/authMiddlerware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken ,getProfileData);

export default router;
