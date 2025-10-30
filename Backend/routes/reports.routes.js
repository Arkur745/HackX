import express from "express";
import {
  uploadReport,
  getReports,
  deleteReport,
  explainReport,
} from "../controllers/reportController.js";
import { uploadReportMiddleware } from "../middleware/multer.middleware.js";
import { requireAuth } from "../middleware/clerk.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/reports
 * @desc    Get all medical reports for the authenticated user
 * @access  Protected (requires authentication)
 */
router.get("/", requireAuth, getReports);

/**
 * @route   POST /api/reports/upload
 * @desc    Uploads a new medical report
 * @access  Protected (requires authentication)
 * @body    FormData { "reportName": "...", "report": FILE }
 */
router.post("/upload", requireAuth, uploadReportMiddleware, uploadReport);

/**
 * @route   POST /api/reports/explain
 * @desc    Explain a medical report in simple language
 * @access  Protected (requires authentication)
 * @body    { reportId: string, language: string }
 */
router.post("/explain", requireAuth, explainReport);

/**
 * @route   DELETE /api/reports/:reportId
 * @desc    Delete a medical report
 * @access  Protected (requires authentication)
 */
router.delete("/:reportId", requireAuth, deleteReport);

export default router;
