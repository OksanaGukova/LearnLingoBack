import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from "dotenv";
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';


  dotenv.config();

const PORT = Number(getEnvVar('PORT', '3000'));


export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(router);


  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
