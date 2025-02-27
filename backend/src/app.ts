import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { registerHealthRoutes } from "./routes/health";
import { registerUserRoutes } from "./routes/users";

const app = fastify({ logger: true });

// Enable CORS
app.register(fastifyCors, {
  origin: "*",
});

// Register routes
registerHealthRoutes(app);
registerUserRoutes(app);

const DEFAULT_PORT = 8000;

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || `${DEFAULT_PORT}`);
    app.listen({
      port,
      host: "0.0.0.0",
    });

    console.log(`Server listening at port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
