import fastify from "fastify";
import fastifyCors from "@fastify/cors";

import { registerHealthRoutes } from "./routes/health";
import { registerUserRoutes } from "./routes/users";
import { DEFAULT_BACKEND_PORT } from "./constants";

const port = parseInt(process.env.BACKEND_PORT || DEFAULT_BACKEND_PORT);

const start = async () => {
  const app = fastify({ logger: true });
  app.log.info("1/5 - Initializing Fastify app...");

  try {
    app.register(fastifyCors, {
      origin: "*",
    });
    app.log.info("2/5 - Cors has been registered");

    registerHealthRoutes(app);
    registerUserRoutes(app);
    app.log.info("3/5 - Routes has been registered");

    await app.ready();
    app.log.info("4/5 - Server app is ready");

    await app.listen({ port, host: "0.0.0.0" });
    app.log.info(`5/5 - Server listening on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
