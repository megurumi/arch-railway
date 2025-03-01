import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { registerHealthRoutes } from "./routes/health";
import { registerUserRoutes } from "./routes/users";
import { DEFAULT_BACKEND_PORT } from "./constants";

const app = fastify({ logger: true });
const port = parseInt(process.env.BACKEND_PORT || DEFAULT_BACKEND_PORT);

console.log("Initializing Fastify app...");

// Enable CORS
app.register(fastifyCors, {
  origin: "*",
});

// Register routes
registerHealthRoutes(app);
registerUserRoutes(app);

const start = async () => {
  try {
    await app.listen({ port });
    console.log(`Server listening at http://localhost:${port}`);
    app.log.info(`Server listening at http://localhost:${port}`);
  } catch (err) {
    console.error("Error starting Fastify app", { err });
    app.log.error(err);
    process.exit(1);
  }
};

export { start };
