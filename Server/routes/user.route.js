import express, { Router } from 'express';
import {
  deleteUser,
  deleteUserAdmin,
  getUser,
  listUsers,
  updateRole,
  updateUser,
} from '../controllers/user.controller.js';
import { isAdmin, isAuthenticated } from '../utils/auth.js';

const router = express.Router();

router.get('/', isAuthenticated, getUser);
router.get('/list', isAdmin, listUsers);
router.put('/update/:id', isAuthenticated, updateUser);
router.put('/update-role/:id', isAdmin, updateRole);
router.delete('/delete/:id', isAuthenticated, deleteUser);
router.delete('/:id', isAdmin, deleteUserAdmin);
export default router;
