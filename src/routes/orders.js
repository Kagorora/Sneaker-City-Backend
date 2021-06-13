import express from 'express';
import orderController from '../controllers/Orders';
import validator from '../middleware/validator';
import { orderSchema } from '../validation/schema/orders';

const router = express.Router();

router.post('/:id', validator(orderSchema), orderController.addOrder);

export default router;
