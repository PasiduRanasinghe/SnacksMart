import express from 'express';
import {
  createProduct,
  getProduct,
  listProducts,
  updateProduct,
} from '../controllers/product.controller.js';
import { verifyToken } from './../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, createProduct);
router.get('/list', verifyToken, listProducts);
router.get('/:id', verifyToken, getProduct);
router.put('/:id', verifyToken, updateProduct);

export default router;
