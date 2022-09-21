const jwt = require("jsonwebtoken");

const createJWT = ({ account_id, username, email, roles }) => {
  const user = { account_id, username, email, roles };
  const id_token = jwt.sign(user, process.env.ID_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  return { id_token, refresh_token };
};

module.exports.createJWT = createJWT;
