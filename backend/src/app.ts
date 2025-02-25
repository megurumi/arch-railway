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

const start = async () => {
  try {
    await app.listen({ port: 8000, host: "0.0.0.0" });
    console.log(`Server listening at http://localhost:8000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
