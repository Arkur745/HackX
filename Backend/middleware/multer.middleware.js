import multer from "multer";

// Configure multer to store files in memory as buffers
// This is essential so we can pass the buffer to Cloudinary
const storage = multer.memoryStorage();

// Allowed file types
const allowedMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];

// Initialize multer with the storage configuration
// We'll accept a single file with the field name 'report'
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Accept PDF, images, and Word documents
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "File type not supported. Only PDF, JPG, PNG, DOC, and DOCX are allowed."
        ),
        false
      );
    }
  },
});

export const uploadReportMiddleware = upload.single("report");
