// import express from 'express'
// import {  checkAuth, login, logout, register } from '../controllers/auth.js';
// import { AddDocument, deleteDocument, getDocuments, reviewDocument, submitForReview, updateDocument } from '../controllers/docAuth.js';
// export const router = express.Router();
// import { userAuth } from '../middleware/userAuth.js';
// router.post('/login',login);
// router.post('/register',register);
// router.post('/logout',logout);
// router.post('/add-doc',userAuth,AddDocument);
// router.get('/get-docs',userAuth,getDocuments)
// router.put('/update-doc/:id',userAuth,updateDocument);
// router.delete('/delete-doc/:id',userAuth,deleteDocument)
// router.post('/submit-review/',userAuth,submitForReview)
// router.post("/review/:docId", userAuth, reviewDocument);
// router.get('/check-auth',checkAuth)


import express from 'express';
import { checkAuth, login, logout, register } from '../controllers/auth.js';
import { 
  AddDocument, 
  deleteDocument, 
  getDocuments, 
  reviewDocument, 
  submitForReview, 
  updateDocument 
} from '../controllers/docAuth.js';
import { userAuth } from '../middleware/userAuth.js';

export const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User authentication and session APIs
 *   - name: Documents
 *     description: Document creation, update, and review APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nidhi Kalouni"
 *               email:
 *                 type: string
 *                 example: "nidhi@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "nidhi@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid credentials.
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful.
 */
router.post('/logout', logout);

/**
 * @swagger
 * /api/auth/check-auth:
 *   get:
 *     summary: Verify if user is authenticated
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User is authenticated.
 *       401:
 *         description: User is not logged in.
 */
router.get('/check-auth', checkAuth);

/**
 * @swagger
 * /api/auth/add-doc:
 *   post:
 *     summary: Create a new document
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "AI-Powered Chatbot Integration"
 *               requirement:
 *                 type: string
 *                 example: "Improve customer support through automation."
 *               intro:
 *                 type: string
 *                 example: "This project integrates a chatbot using AI models."
 *               useCase:
 *                 type: string
 *                 example: "Used for handling customer FAQs."
 *               process:
 *                 type: string
 *                 example: "1. Train model 2. Integrate 3. Deploy"
 *     responses:
 *       201:
 *         description: Document added successfully.
 *       400:
 *         description: Invalid document data.
 */
router.post('/add-doc', userAuth, AddDocument);

/**
 * @swagger
 * /api/auth/get-docs:
 *   get:
 *     summary: Get all documents of the user
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of documents retrieved.
 */
router.get('/get-docs', userAuth, getDocuments);

/**
 * @swagger
 * /api/auth/update-doc/{id}:
 *   put:
 *     summary: Update a document by ID
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Chatbot Project"
 *     responses:
 *       200:
 *         description: Document updated successfully.
 *       404:
 *         description: Document not found.
 */
router.put('/update-doc/:id', userAuth, updateDocument);

/**
 * @swagger
 * /api/auth/delete-doc/{id}:
 *   delete:
 *     summary: Delete a document by ID
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the document
 *     responses:
 *       200:
 *         description: Document deleted successfully.
 *       404:
 *         description: Document not found.
 */
router.delete('/delete-doc/:id', userAuth, deleteDocument);

/**
 * @swagger
 * /api/auth/submit-review:
 *   post:
 *     summary: Submit document for review
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Document submitted for review.
 */
router.post('/submit-review', userAuth, submitForReview);

/**
 * @swagger
 * /api/auth/review/{docId}:
 *   post:
 *     summary: Review a document (approve or reject)
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: docId
 *         required: true
 *         schema:
 *           type: string
 *         description: Document ID to review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [approved, rejected]
 *                 example: approved
 *               reviewerComments:
 *                 type: string
 *                 example: "Good structure, approved for next phase."
 *     responses:
 *       200:
 *         description: Document review completed.
 */
router.post('/review/:docId', userAuth, reviewDocument);

 