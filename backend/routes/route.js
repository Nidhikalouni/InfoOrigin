import express from 'express'
import { login, logout, register } from '../controllers/auth.js';
import { AddDocument, remDocument } from '../controllers/docAuth.js';
export const router = express.Router();

router.post('/login',login);
router.post('/register',register);
router.post('/logout',logout);
router.post('/add-doc',AddDocument);
router.post('/remove-doc',remDocument);
;