import express from 'express';
import { getOrders, placeOrder } from '../controllers/order.controller';
import { verifyToken } from './../utils/verifyUser';

const router = express.Router();

router.post('/', verifyToken, placeOrder);
router.get('/list', verifyToken, getOrders);

export default router;
