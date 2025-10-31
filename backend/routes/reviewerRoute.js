// import express from 'express'
// import { reviewerAuth } from '../middleware/reviewerAuth.js';
// import { reviewerData,getReviewedDocs,getReviewerProfile } from '../controllers/docAuth.js';

// export const reviewerRoute = express.Router();
// reviewerRoute.get('/reviewer-stats',reviewerAuth,reviewerData);
// reviewerRoute.get("/reviewed-docs", reviewerAuth, getReviewedDocs);
// reviewerRoute.get("/reviewer-profile", reviewerAuth, getReviewerProfile);

import express from 'express';
import { reviewerAuth } from '../middleware/reviewerAuth.js';
import { reviewerData, getReviewedDocs, getReviewerProfile } from '../controllers/docAuth.js';

export const reviewerRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviewer
 *   description: Reviewer operations
 */

/**
 * @swagger
 * /api/reviewer/reviewer-stats:
 *   get:
 *     summary: Get reviewer statistics
 *     tags: [Reviewer]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Reviewer statistics retrieved successfully
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
reviewerRoute.get('/reviewer-stats', reviewerAuth, reviewerData);

/**
 * @swagger
 * /api/reviewer/reviewed-docs:
 *   get:
 *     summary: Get all reviewed documents
 *     tags: [Reviewer]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of reviewed documents
 *       401:
 *         description: Unauthorized
 */
reviewerRoute.get('/reviewed-docs', reviewerAuth, getReviewedDocs);

/**
 * @swagger
 * /api/reviewer/reviewer-profile:
 *   get:
 *     summary: Get reviewer profile details
 *     tags: [Reviewer]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Reviewer profile information
 *       401:
 *         description: Unauthorized
 */
reviewerRoute.get('/reviewer-profile', reviewerAuth, getReviewerProfile);
