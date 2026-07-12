import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
// import { notFound } from "./middleware/notFound";

const app = express();

app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

// app.use(notFound);
app.use(errorHandler);

export default app;
