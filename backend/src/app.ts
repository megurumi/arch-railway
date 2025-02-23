import fastify from "fastify";
import mysql from "mysql2";

const app = fastify({ logger: true });

// Connection à MySQL
const pool = mysql.createPool({
  host: "mysql",
  user: "root",
  password: "password",
  database: "app_db",
});

app.get("/api", async (request, reply) => {
  return { message: "Hello from Fastify!" };
});

app.get("/api/data", async (request, reply) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
      reply.status(500).send({ error: "Database error" });
    } else {
      reply.send(results);
    }
  });
});

const start = async () => {
  try {
    await app.listen({ port: 8000 });
    console.log(`Server listening at http://localhost:8000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
