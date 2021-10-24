const helpers = require("../back/helpers");

const userMiddleware = function (request, response, next) {
    const { username } = request.headers.username;
    console.log(username);
    if (username && helpers.userNameExist(username)) {
        next();
    }
    helpers.createNewUserDir(username);
    next();
};
module.exports = userMiddleware;
