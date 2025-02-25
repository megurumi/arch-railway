import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import mysql from "mysql2";

// Connection à MySQL
const pool = mysql.createPool({
  host: "mysql",
  user: "root",
  password: "password",
  database: "app_db",
});

export function registerRoutes(app: FastifyInstance) {
  app.get("/api/health", async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: "api is running!" };
  });

  app.get("/api/users", async (request: FastifyRequest, reply: FastifyReply) => {
    pool.query(
      "SELECT * FROM users",
      (err: mysql.QueryError | null, results: any) => {
        if (err) {
          reply.status(500).send({ error: "Database error" });
        } else {
          reply.send({ users: results });
        }
      }
    );
  });
}
