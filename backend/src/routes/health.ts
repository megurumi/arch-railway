import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const registerHealthRoutes = (app: FastifyInstance) => {
  app.get(
    "/api/health",
    async (_request: FastifyRequest, reply: FastifyReply) => {
      reply.send({ status: "ok" });
    }
  );
};
