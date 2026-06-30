import { initMongoDB } from "./bd/initMongoDB.js";
import { startServer } from "./server.js";


const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();
startServer();
