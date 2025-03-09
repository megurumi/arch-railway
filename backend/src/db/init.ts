import { pool } from "./pool";

async function initialize() {
  console.log("Step 1 - MySQL - Initializing database...");

  const connection = await pool.getConnection();
  console.log("Step 2 - MySQL - Database connected");

  await connection.query(
    `DROP DATABASE IF EXISTS \`${process.env.MYSQL_DATABASE}\`;`
  );
  console.log("Step 3 - MySQL - Existing database dropped");

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`
  );
  await connection.query(`USE \`${process.env.MYSQL_DATABASE}\`;`);
  console.log("Step 4 - MySQL - Database ready to be used");

  await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
    `);

  await connection.query(`
        INSERT INTO users (name) VALUES ('John Doe');
    `);
  await connection.query(`
        INSERT INTO users (name) VALUES ('Jane Doe');
    `);
  console.log("Step 5 - MySQL - Dummy users added");

  connection.release();
}

initialize()
  .then(() => console.log("SUCCESS - MySQL - Database ready!"))
  .catch((err) => {
    console.error("FAIL - MySQL - Initializing database fails due to: ", err);
    process.exit(1);
  });
