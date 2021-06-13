import express from 'express';

import sneakers from './sneakers';

const router = express.Router();

router.use('/api/sneakers', sneakers);

export default router;
