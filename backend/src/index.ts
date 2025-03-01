import fastify from "fastify";

import dotenv from "dotenv";

dotenv.config();

const app = fastify({ logger: true });

app.ready((err) => {
  if (err) {
    app.log.error(err);

    process.exit(1);
  }

  app.listen({ port: 8080 }, (err, address) => {
    if (err) {
      app.log.error(err);

      process.exit(1);
    }

    app.log.info(`Server listening at ${address}`);
  });
});
