import * as Hapi from "@hapi/hapi";
import { routes } from "./routes";

export const init = async () => {
  const server = Hapi.server({
    port: 5050,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
};

init().catch(console.error);
