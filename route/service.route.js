"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index");
});
exports.serviceRouter = router;
