import dotenv from "dotenv";
dotenv.config();

import { app, port } from "./app";

app.ready((err) => {
  console.log("Fastify app is ready", {
    app,
    port,
    err,
  });

  if (err) {
    console.error("App is not ready! Errors detected.", { err });
    app.log.error(err);
    process.exit(1);
  }

  console.log("No errors detected. Starting server...");

  app.listen({ port }, (err, address) => {
    if (err) {
      console.error("App is not listening! Errors detected.", { err });
      app.log.error(err);
      process.exit(1);
    }

    console.log(`Server listening at ${address}`);
    app.log.info(`Server listening at ${address}`);
  });
});
