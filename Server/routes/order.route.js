import express from 'express';
import {
  getAllOrders,
  getOrders,
  placeOrder,
  updateOrderStatus,
} from '../controllers/order.controller.js';

import { isAdmin, isAuthenticated } from '../utils/auth.js';

const router = express.Router();

router.post('/', isAuthenticated, placeOrder);
router.get('/list', isAuthenticated, getOrders);
router.get('/list-all', isAdmin, getAllOrders);
router.put('/update-status/:id', isAdmin, updateOrderStatus);

export default router;
