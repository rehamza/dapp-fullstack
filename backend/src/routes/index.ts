import { Router } from 'express';

const router = Router();

import User from './userRoute'
import Webhook from './webhook'

router.use('/user', User);
router.use('/webhook', Webhook);

export default router;