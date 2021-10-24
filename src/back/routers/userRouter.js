const express = require("express");
const userRouter = express.Router();
const helpers = require("../helpers");

userRouter.post("/info/:user", async (req, res, next) => {
    try {
        res.send(helpers.getUser(req.params.user));
    } catch (err) {
        next(err);
    }
});

module.exports = userRouter;
