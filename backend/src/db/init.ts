import { pool } from "./pool";

const grantQuery = `
  GRANT ALL PRIVILEGES ON ${process.env.MYSQL_DATABASE}.* TO '${process.env.MYSQL_USER}'@'%' IDENTIFIED BY '${process.env.MYSQL_PASSWORD}';
  FLUSH PRIVILEGES;
`;

pool.query(grantQuery, (error: Error, results: unknown) => {
  if (error) {
    console.error("Error granting access:", error);
  } else if (results) {
    console.log("Remote access granted:", results);
  }

  // Close the connection operation completed
  pool.end();
  console.log("Database connection closed.");
});

pool.query(
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )`,
  (error: Error | null) => {
    if (error) {
      console.error("Failed to create users table:", error);
    }

    // Close the connection operation completed
    pool.end();
    console.log("Users table is ready.");
  }
);