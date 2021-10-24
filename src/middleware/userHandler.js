const helpers = require("../back/helpers");

const userMiddleware = function (request, response, next) {
    try {
        const username = request.headers.username;
        if (username && helpers.userNameExist(username)) {
            next();
        }
        helpers.createNewUserDir(username);
        next();
    } catch {
        let err = new Error("already exsist");
        err.code = 403;
        next(err);
    }
};
module.exports = userMiddleware;
