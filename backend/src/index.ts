import dotenv from "dotenv";
dotenv.config();

import { app, port } from "./app";

app.ready((err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.listen({ port }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Server listening at ${address}`);
  });
});
