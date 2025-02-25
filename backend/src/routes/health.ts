import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export function registerHealthRoutes(app: FastifyInstance) {
  app.get("/api/health", async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: "api is running!" };
  });
}
