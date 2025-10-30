import multer from "multer";

// Configure multer to store files in memory as buffers
// This is essential so we can pass the buffer to Cloudinary
const storage = multer.memoryStorage();

// Initialize multer with the storage configuration
// We'll accept a single file with the field name 'report'
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Only accept PDFs
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("File type not supported. Only PDF is allowed."), false);
    }
  },
});

export const uploadReportMiddleware = upload.single("report");
