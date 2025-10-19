import express from 'express'
import {  checkAuth, login, logout, register } from '../controllers/auth.js';
import { AddDocument, deleteDocument, getDocuments, reviewDocument, submitForReview, updateDocument } from '../controllers/docAuth.js';
export const router = express.Router();
import { userAuth } from '../middleware/userAuth.js';
router.post('/login',login);
router.post('/register',register);
router.post('/logout',logout);
router.post('/add-doc',userAuth,AddDocument);
router.get('/get-docs',userAuth,getDocuments)
router.put('/update-doc/:id',userAuth,updateDocument);
router.delete('/delete-doc/:id',userAuth,deleteDocument)
router.post('/submit-review/',userAuth,submitForReview)
router.post("/review/:docId", userAuth, reviewDocument);
router.get('/check-auth',checkAuth)
