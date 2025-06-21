import express from "express";

import healthRoutes from "../healthcheck/health.route";

const router = express.Router();

router.use("/health", healthRoutes);

export default router;
