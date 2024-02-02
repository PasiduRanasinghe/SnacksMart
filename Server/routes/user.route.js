import express, { Router } from 'express';
import {
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/user.controller.js';
import { isAuthenticated } from '../utils/auth.js';

const router = express.Router();

router.get('/', isAuthenticated, getUser);
router.put('/update/:id', isAuthenticated, updateUser);
router.delete('/delete/:id', isAuthenticated, deleteUser);
export default router;
