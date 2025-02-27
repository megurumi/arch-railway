import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/pool";

export function registerUserRoutes(app: FastifyInstance) {
  app.get(
    "/api/users",
    async (request: FastifyRequest, reply: FastifyReply) => {
      console.log("-----------------");
      console.log("pool.config");
      console.log(pool.config);
      console.log("-----------------");

      try {
        const [results] = await pool.query("SELECT id, name FROM users");
        console.log("-----------------");
        console.log("results");
        console.log(results);
        console.log("-----------------");

        return reply.send({ users: results });
      } catch (error) {
        console.error("Database query failed:", error);
        return reply.status(500).send({ error: "Database query failed" });
      }
    }
  );
}
