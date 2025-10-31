// import express from "express";
// import { getAllUsers, getStats,getAllDocuments} from "../controllers/adminController.js";
// import { getSingleDocument } from "../controllers/adminController.js";
// import {adminAuth} from '../middleware/adminAuth.js'

// const adminRoute = express.Router();


// adminRoute.get("/stats", adminAuth, getStats);
// adminRoute.get('/users',adminAuth,getAllUsers)
// adminRoute.get("/documents",adminAuth,  getAllDocuments);
// adminRoute.get("/documents/:docId",adminAuth, getSingleDocument);
// export default adminRoute;

import express from "express";
import { getAllUsers, getStats, getAllDocuments, getSingleDocument } from "../controllers/adminController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const adminRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management and dashboard APIs
 */

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get overall system statistics
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched admin statistics
 *       401:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Server error
 */
adminRoute.get("/stats", adminAuth, getStats);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get list of all users
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched users
 *       401:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Server error
 */
adminRoute.get("/users", adminAuth, getAllUsers);

/**
 * @swagger
 * /api/admin/documents:
 *   get:
 *     summary: Get all uploaded documents
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all documents
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
adminRoute.get("/documents", adminAuth, getAllDocuments);

/**
 * @swagger
 * /api/admin/documents/{docId}:
 *   get:
 *     summary: Get details of a specific document
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: docId
 *         required: true
 *         schema:
 *           type: string
 *         description: Document ID to fetch
 *     responses:
 *       200:
 *         description: Document details retrieved successfully
 *       404:
 *         description: Document not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
adminRoute.get("/documents/:docId", adminAuth, getSingleDocument);

export default adminRoute;
