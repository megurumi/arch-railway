import { FastifyInstance } from "fastify";

export const registerHealthRoutes = (app: FastifyInstance) => {
  app.get("/api/health", async (request, reply) => {
    reply.send({ status: "ok" });
  });
};
