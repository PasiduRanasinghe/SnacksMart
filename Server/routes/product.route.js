import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from '../controllers/product.controller.js';
import { verifyToken } from './../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, createProduct);
router.get('/list', listProducts);
router.get('/:id', getProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;
