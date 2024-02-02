import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from '../controllers/product.controller.js';
import { verifyToken } from './../utils/verifyUser.js';
import { isAdmin } from '../utils/auth.js';

const router = express.Router();

router.post('/', isAdmin, createProduct);
router.get('/list', listProducts);
router.get('/:id', getProduct);
router.put('/:id', isAdmin, updateProduct);
router.delete('/:id', isAdmin, deleteProduct);

export default router;
