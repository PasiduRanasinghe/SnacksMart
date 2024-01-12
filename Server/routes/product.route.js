import express from 'express';
import {
  createProduct,
  getAllProducts,
} from '../controllers/product.controller.js';
import { verifyToken } from './../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createProduct);
router.get('/list', getAllProducts);

export default router;
