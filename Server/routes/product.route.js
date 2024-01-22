import express from 'express';
import {
  createProduct,
  listProducts,
} from '../controllers/product.controller.js';
import { verifyToken } from './../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createProduct);
router.get('/list', verifyToken, listProducts);

export default router;
