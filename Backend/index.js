import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import connectDB from './config/db.js';

console.log("Loaded PORT:", PORT);
const app = express();
app.use(cors());
app.use(express.json());

await connectDB();
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});