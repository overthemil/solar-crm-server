const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ms = require("ms");

const db = require("../../db");
const router = require("express-promise-router")();

const { createJWT } = require("../../utils/jwt");
const { getUserRoles } = require("../../utils/user");

router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).send("Missing email or password in request");
  }

  // Check if user with the received email exists
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (rows.length === 0) {
    return response.status(403).send("Incorrect username or password");
  }
  const user = rows[0];
  user.roles = await getUserRoles(user.id);

  // User email was found, check password
  const validPassword = await bcrypt.compare(password, user.pass);
  if (!validPassword) {
    return response.status(403).send("Incorrect username or password");
  }
  if (!user.active) {
    return response.status(403).send("Account disabled. Contact admin");
  }

  // Everything looks good, send back a JWT
  const tokens = createJWT(user);
  response.cookie("refresh_token", tokens.refresh_token, {
    expires: new Date(Date.now() + ms("1y")),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return response.status(200).json({ id_token: tokens.id_token });
});

module.exports = router;
