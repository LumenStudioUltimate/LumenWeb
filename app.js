"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookieParser = __importStar(require("cookie-parser"));
const express = __importStar(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const config = __importStar(require("./config.json"));
const api_route_1 = require("./route/api.route");
const service_route_1 = require("./route/service.route");
const PORT = 443;
const app = express.default();
// view engine setup
app.set("views", path_1.default.join(__dirname, "./views"));
app.set("view engine", "ejs");
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookieParser.default());
app.use(express.static(path_1.default.join(__dirname, "./public")));
app.use("", service_route_1.serviceRouter);
app.use("/api", api_route_1.apiRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = config.Project.status === "dev" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error", { error: res.locals.error });
});
const server = https_1.default.createServer({
    ca: fs_1.default.readFileSync(path_1.default.join(__dirname, "./cert/fullchain1.pem")),
    key: fs_1.default.readFileSync(path_1.default.join(__dirname, "./cert/privkey1.pem")),
    cert: fs_1.default.readFileSync(path_1.default.join(__dirname, "./cert/cert1.pem"))
}, app);
server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    console.log("https://localhost:" + PORT);
});
