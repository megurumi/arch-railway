import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import dotenv from "dotenv";

import { registerHealthRoutes } from "./routes/health";
import { registerUserRoutes } from "./routes/users";
import { DEFAULT_BACKEND_PORT } from "./constants";
import { pool } from "./db/pool";

dotenv.config();

const port = parseInt(process.env.BACKEND_PORT || DEFAULT_BACKEND_PORT);

const start = async () => {
  const app = fastify({ logger: true });
  app.log.info("Step 1 - Initializing Fastify app...");

  try {
    app.register(fastifyCors, {
      origin: "*",
    });
    app.log.info("Step 2 - Cors has been registered");

    registerHealthRoutes(app);
    registerUserRoutes(app);
    app.log.info("Step 3 - Routes has been registered");

    await app.ready();
    app.log.info("Step 4 - Server app is ready");

    await app.listen({ port, host: "0.0.0.0" });
    app.log.info(`Step 5 - Server listening on port ${port}`);

    await pool
      .getConnection()
      .catch((err) => app.log.error(err))
    app.log.info("Step 6 - MySQL connected");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
