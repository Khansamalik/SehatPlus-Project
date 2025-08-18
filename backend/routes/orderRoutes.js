import express from 'express';
import { createOrder, getUserOrders, updateOrderStatus } from '../Controllers/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createOrder);
router.get('/', getUserOrders);
router.put('/:id/status', updateOrderStatus);

export default router;
