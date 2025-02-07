import express, { Express } from "express";
import { db } from "../db";
import { tasks, users, proposals } from "@shared/schema";

export default function routes(app: Express) {
  const router = express.Router();

  // Basic health check route
  router.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api", router);
  
  return app;
} 