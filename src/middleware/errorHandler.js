/** @format */

const errorHandler = async (error, request, response) => {
    console.log(error.message);
    console.log("here");
    // switch (error.message) {
    //     case 403:
    //         response.status(403);
    //         response.send(
    //             "User is tring to catch already caught pokemon or releasing an uncaught pokemon"
    //         );
    //         break;
    //     case 404:
    //         response.status(404);
    //         response.send("Pokemon not found");
    //         break;
    //     case 500:
    //         response.status(500);
    //         response.send("Server errors");
    //         break;
    //     case 401:
    //         response.status(401);
    //         response.send(
    //             "Unauthenticated user request (pokemon requests missing the username header)"
    //         );
    //         break;
    // }
};
//module.exports = errorHandler;
