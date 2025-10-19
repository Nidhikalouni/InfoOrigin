import express from "express";
import { getAllUsers, getStats,getAllDocuments} from "../controllers/adminController.js";
import { getSingleDocument } from "../controllers/adminController.js";
import {adminAuth} from '../middleware/adminAuth.js'

const adminRoute = express.Router();


adminRoute.get("/stats", adminAuth, getStats);
adminRoute.get('/users',adminAuth,getAllUsers)
adminRoute.get("/documents",adminAuth,  getAllDocuments);
adminRoute.get("/documents/:docId",adminAuth, getSingleDocument);
export default adminRoute;
