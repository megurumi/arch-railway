import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/pool";

export const registerUserRoutes = (app: FastifyInstance) => {
  app.get(
    "/api/users",
    async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const [rows] = await pool.query("SELECT id, name FROM users");
        return reply.send({ users: rows });
      } catch (error) {
        console.error("Database query failed:", error);
        return reply.status(500).send({ error: "Database query failed" });
      }
    }
  );
};

// in progress feed db before doing anything if local
// find a tool for migration?