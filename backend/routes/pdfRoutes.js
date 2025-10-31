// import express from "express";
// import { downloadPDF } from "../controllers/pdfController.js"

// const pdfRouter = express.Router();
// pdfRouter.get('/download/:id/:versionNo', downloadPDF);         
// export default pdfRouter;

import express from "express";
import { downloadPDF } from "../controllers/pdfController.js";

const pdfRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: PDF
 *   description: PDF download and management
 */

/**
 * @swagger
 * /api/pdf/download/{id}/{versionNo}:
 *   get:
 *     summary: Download a specific version of a document as PDF
 *     tags: [PDF]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the document to download
 *       - in: path
 *         name: versionNo
 *         required: true
 *         schema:
 *           type: integer
 *         description: Version number of the document
 *     responses:
 *       200:
 *         description: PDF file downloaded successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Document or version not found
 *       500:
 *         description: Server error
 */
pdfRouter.get('/download/:id/:versionNo', downloadPDF);

export default pdfRouter;
