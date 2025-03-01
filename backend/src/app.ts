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

const start = async () => {
  console.log(`Fastify app has been registered for port ${port}`);
  console.log(app);

  try {
    app.ready((err) => {
      console.log("Fastify app is ready", {
        app,
        port,
        err,
      });

      if (err) {
        console.error("App is not ready! Errors detected.", { err });
        app.log.error(err);
        process.exit(1);
      }

      console.log("App listener starting...");
      app.listen({ port }, (err, address) => {
        if (err) {
          console.error("App is not listening! Errors detected.", { err });
          app.log.error(err);
          process.exit(1);
        }

        console.log(`Server listening at ${address}`);
        app.log.info(`Server listening at ${address}`);
      });
    });
  } catch (err) {
    console.error("Error starting Fastify app", { err });
    app.log.error(err);
    process.exit(1);
  }
};

start();
