import { pool } from "./pool";

pool.query(
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )`,
  (error) => {
    if (error) {
      console.error("Failed to create users table:", error);
    } else {
      console.log("Users table is ready.");
    }
  }
);
