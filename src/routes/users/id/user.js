const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");

const db = require("../../../db");
const router = express.Router();

const salt_rounds = 10;

router.get("/:id", async (request, response, next) => {
  const { id } = request.params;

  if (!validator.isUUID(id)) {
    return response.status(400).send("ID must be a valid UUID");
  }

  const { rows } = await db.query("SELECT * FROM users WHERE id=$1", [id]);

  if (rows.length === 0) {
    return response.status(404).send("User not found");
  }
  return response.status(200).json(rows[0]);
});

router.post("/:id/create-password", async (request, response, next) => {
  const { id } = request.params;
  const { password } = request.body;

  if (!password) {
    return response.status(400).send("Missing password");
  }
  if (!validator.isUUID(id)) {
    return response.status(400).send("ID must be a valid UUID");
  }

  const { rows: user_data } = await db.query(
    "SELECT * FROM users WHERE id=$1 ORDER BY create_date ASC",
    [id]
  );
  if (user_data.length === 0) {
    return response.status(404).send("User not found");
  }
  const user = user_data[0];

  if (user.pass) {
    return response
      .status(400)
      .send(
        "This endpoint can only be used for new accounts that don't have a password yet"
      );
  }

  const hashed_pass = await bcrypt.hash(password, salt_rounds);
  const { rows } = await db.query(
    "UPDATE users SET pass=$1 WHERE id=$2 RETURNING id, username, email, phone;",
    [hashed_pass, id]
  );

  return response.status(200).json(rows[0]);
});

module.exports = router;
