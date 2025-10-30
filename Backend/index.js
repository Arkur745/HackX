import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import bodyParser from "body-parser";
import connectDB from './config/db.js';
import chatRoutes from './routes/chat.routes.js';
import medicalReportRoutes from "./routes/reports.routes.js";
import setupCloudinary from './config/cloudinary.js';
import appointmentRoutes from "./routes/appointment.routes.js";
import reminderRoutes from "./routes/reminder.routes.js";

console.log("Loaded PORT:", PORT);
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));

await connectDB();
setupCloudinary();
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/chat", chatRoutes);
app.use("/api/reports", medicalReportRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/reminders", reminderRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});