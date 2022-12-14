import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";
import credentialRouter from "./routes/credentialRouter.js";
import noteRouter from "./routes/noteRouter.js";
import cardRouter from "./routes/cardRouter.js";
import wifiRouter from "./routes/wifiRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.use(authRouter);
server.use(credentialRouter);
server.use(noteRouter);
server.use(cardRouter);
server.use(wifiRouter);

server.use(errorHandler);

server.listen(process.env.PORT, () =>
    console.log("servidor rodando na porta " + process.env.PORT)
);