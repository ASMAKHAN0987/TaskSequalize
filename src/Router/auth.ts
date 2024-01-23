import { Router } from "express";
import express from 'express'
import { loginController, signup } from '../Controller/authController';
const router = express.Router();

router.post('/signup',signup);
router.post('/login',loginController)
export default router;