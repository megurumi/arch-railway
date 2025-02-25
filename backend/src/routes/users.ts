import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import mysql from "mysql2";

// Connection à MySQL
const pool = mysql.createPool({
  host: "mysql",
  user: "root",
  password: "password",
  database: "app_db",
});

export function registerUserRoutes(app: FastifyInstance) {
  app.get("/api/users", async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ users: [{ id: 1, name: "mon cul" }] });
  });
}
