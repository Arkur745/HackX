import express from "express";
import { uploadReport } from "../controllers/reportController.js";
import { uploadReportMiddleware } from "../middleware/multer.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/reports/upload
 * @desc    Uploads a new medical report
 * @access  Public (add auth later)
 * @body    FormData { "userId": "...", "reportName": "...", "report": FILE }
 */
router.post("/upload", uploadReportMiddleware, uploadReport);

export default router;
