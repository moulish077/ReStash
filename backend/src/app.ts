import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import resourceRoutes from "./routes/resourceRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
res.json({
message: "Welcome to ReStash API!",
status: "running",
});
});

app.get("/api/health", (_req, res) => {
res.json({
success: true,
message: "ReStash backend is healthy",
});
});

app.use("/api/resources", resourceRoutes);

app.listen(PORT, () => {
console.log("ReStash API running at http://localhost:3000");
});