import fastify from "fastify";
import fastifyCors from "@fastify/cors";

import { registerHealthRoutes } from "./routes/health";
import { registerUserRoutes } from "./routes/users";
import { DEFAULT_BACKEND_PORT } from "./constants";

const port = parseInt(process.env.BACKEND_PORT || DEFAULT_BACKEND_PORT);

const start = async () => {
  const app = fastify({ logger: true });
  app.log.info("Initializing Fastify app...");

  try {
    app.register(fastifyCors, {
      origin: "*",
    });
    app.log.info("Cors has been registered");

    registerHealthRoutes(app);
    registerUserRoutes(app);
    app.log.info("Routes has been registered");

    await app.ready();
    app.log.info("Server app is ready");

    await app.listen({ port, host: "0.0.0.0" });
    app.log.info(`Server listening on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
