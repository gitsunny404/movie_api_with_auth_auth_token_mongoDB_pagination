import express from "express";
import dotenv from "dotenv";
import connectDB from "./repo/movie.repo.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import movieRouter from "./routes/movie.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// documentation
app.use(express.static(join(__dirname, 'public')));

app.get('/documentation', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});


// Middleware
app.use(express.json());

// Movie Routes
app.use("/api/v1", movieRouter);
// User Routes 
app.use("/api/v1", userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
