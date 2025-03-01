import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { registerHealthRoutes } from "./routes/health";
import { registerUserRoutes } from "./routes/users";
import { DEFAULT_BACKEND_PORT } from "./constants";

export const app = fastify({ logger: true });
export const port = parseInt(process.env.BACKEND_PORT || DEFAULT_BACKEND_PORT);

console.log("Initializing Fastify app...");

// Enable CORS
app.register(fastifyCors, {
  origin: "*",
});

// Register routes
registerHealthRoutes(app);
registerUserRoutes(app);
