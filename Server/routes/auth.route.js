import express from 'express';
import {
  google,
  login,
  logout,
  signup,
} from '../controllers/auth.controller.js';
import validate from '../middleware/validate.js';
import { signUpSchema } from '../utils/validations/authSchemas.js';
import { isAuthenticated } from '../utils/auth.js';

import passport from '../utils/passport.js';
const router = express.Router();

router.post('/signup', validate(signUpSchema), signup);
router.post('/login', login);
router.post('/google', google);
router.get('/logout', isAuthenticated, logout);
router.get('/userRole');

export default router;
