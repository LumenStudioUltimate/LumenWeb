import fs from "fs";
import https from "https";
import path from "path";

import bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import * as config from "./config.json";
import {HttpException} from "./map/types";
import {apiRouter} from "./route/api.route";
import {serviceRouter} from "./route/service.route";


const PORT = 3000;
const app = express.default();

// view engine setup
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser.default());
app.use(express.static(path.join(__dirname, "./public")));

app.use("", serviceRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = config.Project.status === "dev" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error", {error: res.locals.error});
});

const server = https.createServer({
    ca: fs.readFileSync(path.join(__dirname, "./cert/fullchain1.pem")),
    key: fs.readFileSync(path.join(__dirname, "./cert/privkey1.pem")),
    cert: fs.readFileSync(path.join(__dirname, "./cert/cert1.pem"))
}, app);

server.listen(PORT, () => {
    console.log("Server is running on port "+PORT);
    console.log("https://localhost:"+PORT);
});