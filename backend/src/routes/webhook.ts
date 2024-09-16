import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import { verifyToken } from '../middlerwares/authMiddlerware';
import { receiveTelegramData, sendMessageEndpoint, setTelegramWebhook } from '../controllers/telegramWebhookController';

const router = Router();

router.post('/setWebhook', setTelegramWebhook);
router.post('/receiveTelegramData', receiveTelegramData);
router.post('/sendMessage', sendMessageEndpoint);

export default router;
