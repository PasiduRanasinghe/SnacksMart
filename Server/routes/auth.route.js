import express from 'express';
import {
  google,
  login,
  logout,
  signup,
} from '../controllers/auth.controller.js';
import validate from '../middleware/validate.js';
import { logInSchema, signUpSchema } from '../utils/validations/authSchemas.js';
import { verifyToken } from './../utils/verifyUser.js';

const router = express.Router();

router.post('/signup', validate(signUpSchema), signup);
router.post('/login', validate(logInSchema), login);
router.post('/google', google);
router.get('/logout', verifyToken, logout);

export default router;
