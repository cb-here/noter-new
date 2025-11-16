import "./loadEnv.js";
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";

const app = express();

const allowedOrigins = (
  process.env.ALLOWED_DOMAINS || "http://localhost:3000"
).split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);

app.use(express.json({ limit: "1gb" }));
app.use(express.urlencoded({ limit: "1gb", extended: true }));

connectDB()
  .then(async () => {
    console.log("Connected to database");
    const noteRoutes = await import("./src/routes/note.route.js");

    app.use("/api/notes", noteRoutes.default);
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

app.get("/status", (req, res) => {
  res.json({ service: "api", status: "running" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
  console.log(`You can access the application at: http://localhost:${PORT}`);
});