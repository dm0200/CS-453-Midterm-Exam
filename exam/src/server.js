// server.js initializes Express, attaches the middleware, mapping the routing & handles healthpoint
//src/server.js

//import "dotenv/config";
import express from "express";

//import { requestId } from "./middleware/requestId.js";
//import { requireApiKey } from "./middleware/requireApiKey.js";
//import { notFound } from "./middleware/notFound.js";
import { router as tasksRouter } from "./routes/tasks.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const PORT = process.env.PORT || 3000;

export function createApp() {
    const app = express();

    // Built-in middleware for JSON request bodies.
    app.use(express.json());

    // Application-level middleware.
    //app.use(requestId);
    app.use(logger);

    // Health checkpoint
    app.get("health", (req, res) => {
        res.json({
            status: "ok",
            message: "Server is healthy"
        });
    });

    // Task resource routes grouped under /api/tasks
    app.use("api/tasks", tasksRouter);

    // Global centralized error handling middleware
    app.use(errorHandler);

    return app;
}

const app = createApp();

app.listen(PORT, () => {
    console.log(`Course Task Tracker listening on port ${PORT}`);
});