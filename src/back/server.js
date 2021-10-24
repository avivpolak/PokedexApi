/** @format */

const express = require("express");
const app = express();
const port = 3000;
const pokemonRouter = require("./routers/pokemonRouter");
const userRouter = require("./routers/userRouter");
const userMiddleware = require("../middleware/userHandler");

app.use(userMiddleware);
app.use("/pokemon", pokemonRouter);
app.use("/user", userRouter);

// route our app

app.use(function (err, req, res, next) {
    // if (!err.code) {
    //     err.message = "server error";
    // }
    res.status(err.code || 500).send(`${err.code || 500} | ${err.message}`);
});

app.listen(port, function () {
    console.log("app started");
});
