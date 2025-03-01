import dotenv from "dotenv";
dotenv.config();

import { app, port } from "./app";

const start = async () => {
  console.log(`Fastify app has been register for port ${port}`);
  console.log(app);

  try {
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

      console.log("App listenner starting...");
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
  } catch (err) {
    console.error("Error starting Fastify app", { err });
    app.log.error(err);
    process.exit(1);
  }
};

start();
