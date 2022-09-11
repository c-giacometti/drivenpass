import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.use(authRouter);

server.use(errorHandler);

server.listen(process.env.PORT, () =>
    console.log("servidor rodando na porta " + process.env.PORT)
);