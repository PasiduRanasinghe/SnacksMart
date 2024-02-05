import express from 'express';

import { isAdmin, isAuthenticated } from '../utils/auth.js';
import {
  createInquiry,
  deleteInquiry,
  listInquiry,
} from '../controllers/inquiry.controller.js';

const router = express.Router();

router.post('/', createInquiry);
router.get('/list', isAdmin, listInquiry);
router.delete('/:id', isAdmin, deleteInquiry);
export default router;
