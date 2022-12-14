const validator = require("validator");
const bcrypt = require("bcrypt");

const db = require("../../../db");
const router = require("express-promise-router")();

const { getUserRoles, userHasRole } = require("../../../utils/user");
const { getUserSchema } = require("../../../schema/user");
const { authenticate, authorize } = require("../../../middleware/auth");

const salt_rounds = 10;

router.get("/:id", authenticate, async (request, response, next) => {
  const { id } = request.params;

  if (!validator.isUUID(id)) {
    return response.status(400).json({ message: "ID must be a valid UUID" });
  }

  const { rows: user_data } = await db.query(
    "SELECT id, username, email, phone, active, create_date, last_updated FROM users WHERE id=$1",
    [id]
  );
  if (user_data.length === 0) {
    return response.status(404).json({ message: "User not found" });
  }

  const user_roles = await getUserRoles(user_data[0].id);
  const user = getUserSchema(user_data[0], user_roles);
  return response.status(200).json({ data: user });
});

router.post("/:id/create-password", async (request, response, next) => {
  const { id } = request.params;
  const { password } = request.body;

  if (!password) {
    return response.status(400).json({ message: "Missing password" });
  }
  if (!validator.isUUID(id)) {
    return response.status(400).json({ message: "ID must be a valid UUID" });
  }

  const { rows: user_data } = await db.query(
    "SELECT * FROM users WHERE id=$1 ORDER BY create_date ASC",
    [id]
  );
  if (user_data.length === 0) {
    return response.status(404).json({ message: "User not found" });
  }
  const user = user_data[0];

  if (user.pass) {
    return response.status(400).json({
      message:
        "This endpoint can only be used for new accounts that don't have a password yet",
    });
  }

  const hashed_pass = await bcrypt.hash(password, salt_rounds);
  const { rows } = await db.query(
    "UPDATE users SET pass=$1 WHERE id=$2 RETURNING *",
    [hashed_pass, id]
  );

  const user_roles = await getUserRoles(rows[0].id);
  const updated_user = getUserSchema(rows[0], user_roles);

  return response.status(200).json({ data: updated_user });
});

router.patch(
  "/:id/change-password",
  authenticate,
  async (request, response) => {
    const { old_password, password } = request.body;
    const { id } = request.params;
    if (!password || !old_password) {
      return response.status(400).json({ message: "Some fields are missing" });
    }
    if (password.length < 5) {
      return response
        .status(400)
        .json({ message: "Password must be at least 5 characters" });
    }

    if (id !== request.user.id) {
      if (!userHasRole(request.user, ["System Administrator"])) {
        return response
          .status(401)
          .json({ message: "Not authorized to change this user's password" });
      }
    }

    const { rows: user_data } = await db.query(
      "SELECT * FROM users WHERE id=$1",
      [id]
    );
    if (user_data.length === 0) {
      return response.status(404).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(old_password, user_data[0].pass);
    if (!validPassword) {
      return response.status(403).json({ message: "Incorrect password" });
    }

    // Hash the password then insert into the accounts table
    bcrypt.hash(password, salt_rounds, async (error, hash) => {
      if (error) {
        return response
          .status(500)
          .json({ message: "Error when updating password" });
      }
      const { rows } = await db.query(
        "UPDATE users SET pass=$1 WHERE id=$2 RETURNING *",
        [hash, id]
      );
      const user_roles = await getUserRoles(rows[0].id);
      const updated_user = getUserSchema(rows[0], user_roles);

      return response.status(200).json({ data: updated_user });
    });
  }
);

router.put(
  "/:id/roles",
  authenticate,
  authorize(["System Administrator", "Manager"]),
  async (request, response) => {
    const { roles } = request.body;
    const { id } = request.params;

    if (!roles) {
      return response.status(400).json({ message: "Must pass roles to set" });
    }
    if (!Array.isArray(roles)) {
      return response
        .status(400)
        .json({ message: "Roles must be in an array" });
    }

    await db.query("DELETE FROM assigned_roles WHERE user_id = $1", [id]);

    await Promise.all(
      roles.map(async (role) => {
        await db.query(
          "INSERT INTO assigned_roles(role_id, user_id) VALUES ($1, $2)",
          [role.id, id]
        );
      })
    );

    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const user_roles = await getUserRoles(rows[0].id);
    const updated_user = getUserSchema(rows[0], user_roles);

    return response.status(200).json({ data: updated_user });
  }
);

router.patch("/:id", authenticate, async (request, response) => {
  const { username, email, phone, active } = request.body;
  const { id } = request.params;

  // Only System Admin and Managers can change details of other users
  if (id !== request.user.id) {
    if (!userHasRole(request.user, ["System Administrator", "Manager"])) {
      return response
        .status(401)
        .json({ message: "Not authorized to change this user's details" });
    }
  }

  const sql_query = `
      UPDATE users SET
        username = COALESCE($1, username),
        email = COALESCE($2, email),
        phone = COALESCE($3, phone),
        active = COALESCE($4, active)
      WHERE id=$5 RETURNING *;
    `;
  const sql_values = [username, email, phone, active, id];
  const { rows: user_rows } = await db.query(sql_query, sql_values);

  const user_roles = await getUserRoles(user_rows[0].id);
  const updated_user = getUserSchema(user_rows[0], user_roles);

  return response.status(200).json({ data: updated_user });
});

module.exports = router;
