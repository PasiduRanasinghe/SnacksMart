import express from 'express';
import { login, signup } from '../controllers/auth.controller.js';
import validate from '../middleware/validate.js';
import { logInSchema, signUpSchema } from '../utils/validations/authSchemas.js';

const router = express.Router();

router.post('/signup', validate(signUpSchema), signup);
router.post('/login', validate(logInSchema), login);

export default router;
