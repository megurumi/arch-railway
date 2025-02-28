import fastify from "fastify";
import { registerUserRoutes } from "./routes/users";
import dotenv from "dotenv";

import "./db/init"; // Initialize the database

dotenv.config();

const app = fastify({ logger: true });

registerUserRoutes(app);

app.ready((err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.listen({ port: 8080 }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Server listening at ${address}`);
  });
});
