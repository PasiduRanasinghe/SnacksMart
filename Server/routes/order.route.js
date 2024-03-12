import express from 'express';
import { getOrders, placeOrder } from '../controllers/order.controller.js';

import { isAdmin, isAuthenticated } from '../utils/auth.js';

const router = express.Router();

router.post('/', isAuthenticated, placeOrder);
router.get('/list', isAdmin, getOrders);

export default router;
