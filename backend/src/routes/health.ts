import { FastifyInstance } from "fastify";

export const registerHealthRoutes = (app: FastifyInstance) => {
  app.get("/health", async (request, reply) => {
    reply.send({ status: "ok" });
  });
};
