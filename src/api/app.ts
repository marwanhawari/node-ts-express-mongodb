import express, { urlencoded, json, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import ResponseMessage from "../types/responseMessage";
import { errorHandler } from "../middleware/errorHandler";
import usersRouter from "./users/users.route";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req: Request, res: Response<ResponseMessage>) => {
    res.json({
        message: "Please use the /users endpoint.",
    });
});

app.use("/users", usersRouter);

app.use(errorHandler);

export default app;
