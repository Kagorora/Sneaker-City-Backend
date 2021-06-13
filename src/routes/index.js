import express from 'express';

import sneakers from './sneakers';
import orders from './orders';

const router = express.Router();

router.use('/api/sneakers', sneakers);
router.use('/api/orders', orders);

export default router;
