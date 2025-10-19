import express from "express";
import { downloadPDF } from "../controllers/pdfController.js"

const pdfRouter = express.Router();
pdfRouter.get('/download/:id/:versionNo', downloadPDF);         
export default pdfRouter;
