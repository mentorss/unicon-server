import cors from "cors";
import express from "express";
import { authRouter } from "./auth/auth.router";
import { homeRouter } from "./home/home.router";
import { notFoundHandler } from "./common/not-found.middleware";
import morganMiddleware from "./config/morganMiddleware";
import { jwtMiddleware } from "./utils/jwtMiddleWare";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morganMiddleware);

/* path */
app.use("/auth", authRouter);

/* authenticate Jwt */
app.use(jwtMiddleware);

/* authenticated path */
app.use("/home", homeRouter);

app.use(notFoundHandler);

export default app;
