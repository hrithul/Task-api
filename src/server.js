import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import rateLimiter from "./middleware/rateLimiter.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(rateLimiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
