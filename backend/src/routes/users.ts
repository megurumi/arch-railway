import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../db/pool";

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
`;

export const registerUserRoutes = (app: FastifyInstance) => {
  app.get(
    "/api/users",
    async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        await pool.query(createUsersTableQuery);

        const [rows] = await pool.query("SELECT id, name FROM users");
        return reply.send({ users: rows });
      } catch (error) {
        console.error("Database query failed:", error);
        return reply.status(500).send({ error: "Database query failed" });
      }
    }
  );
};
