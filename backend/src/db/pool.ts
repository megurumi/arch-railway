import mysql from "mysql2/promise";
import dotenv from "dotenv";

import { DEFAULT_DB_PORT } from "../constants";

dotenv.config();

const requiredEnvVars = [
  "MYSQL_HOST",
  "MYSQL_USER",
  "MYSQL_PASSWORD",
  "MYSQL_DATABASE",
];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`FAIL - MySQL - Variable ${varName} is not set.`);
  }
});

export const pool = mysql.createPool({
  port: parseInt(process.env.MYSQL_PORT || DEFAULT_DB_PORT),
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false },
});
