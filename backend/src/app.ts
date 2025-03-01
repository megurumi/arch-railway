import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { registerHealthRoutes } from "./routes/health";
import { registerUserRoutes } from "./routes/users";
import dotenv from "dotenv";
import { DEFAULT_BACKEND_PORT } from "./constants";

dotenv.config();

const app = fastify({ logger: true });
const port = parseInt(process.env.BACKEND_PORT || DEFAULT_BACKEND_PORT);

// Enable CORS
app.register(fastifyCors, {
  origin: "*",
});

// Register routes
registerHealthRoutes(app);
registerUserRoutes(app);

const start = async () => {
  try {
    app.listen({
      port,
      host: "0.0.0.0",
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
