const jwt = require("jsonwebtoken");

/**
 * Middleware for server authentication. Will take the token from the
 * authorization header in each request and verify if it's valid and hasn't
 * expired. Will return a HTTP status 401 when the token isn't valid.
 */
const authenticate = (request, response, next) => {
  const header = request.headers?.authorization;
  if (
    header !== "Bearer null" &&
    request.headers?.authorization?.startsWith("Bearer ")
  ) {
    const token = request.headers.authorization.split("Bearer ")[1];
    if (!token) {
      return response.status(401).send("Null Token");
    }

    jwt.verify(token, process.env.ID_TOKEN_SECRET, (error, user) => {
      if (error) {
        return response.status(401).send("Authentication Failure");
      }
      request.user = user;
      next();
    });
  } else {
    return response.status(403).send("Not logged in");
  }
};

/**
 * Only gives access to the route to the roles passed.
 * Example authorize(['Sales', 'Manager'])
 *
 * @param {[string]} roles
 * @returns Next function
 */
const authorize = (roles) => {
  return (request, response, next) => {
    const request_has_valid_role = request.user.roles.some((a) =>
      roles.includes(a.name)
    );
    if (request_has_valid_role) {
      next();
      return;
    }

    return response.status(403).send("Unauthorized");
  };
};

module.exports.authenticate = authenticate;
module.exports.authorize = authorize;
