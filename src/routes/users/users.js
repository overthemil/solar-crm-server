const db = require("../../db");
const authenticate = require("../../middleware/auth");
const router = require("express-promise-router")();

const { getUserSchema } = require("../../schema/user");
const { getUserRoles } = require("../../utils/user");

router.get("/", authenticate, async (request, response, next) => {
  const { active } = request.query;

  const getQuery = () => {
    if (active === "true") {
      return {
        sql_query:
          "SELECT id, username, email, phone, active, create_date, last_updated FROM users WHERE active=TRUE ORDER BY create_date ASC",
        values: [],
      };
    } else if (active === "false") {
      return {
        sql_query:
          "SELECT id, username, email, phone, active, create_date, last_updated FROM users WHERE active=FALSE ORDER BY create_date ASC",
        values: [],
      };
    }

    return {
      sql_query:
        "SELECT id, username, email, phone, active, create_date, last_updated FROM users ORDER BY create_date ASC",
      values: [],
    };
  };
  const { sql_query, values } = getQuery();
  const { rows: user_rows } = await db.query(sql_query, values);

  const users = await Promise.all(
    user_rows.map(async (user) => {
      const user_roles = await getUserRoles(user.id);
      const user_schema = getUserSchema(user, user_roles);

      return user_schema;
    })
  );

  return response.status(200).json(users);
});

router.post("/", authenticate, async (request, response, next) => {
  const { username, email, phone, role_id } = request.body;

  if ((!username, !email)) {
    return response.status(400).send("Username or email missing from body");
  }

  const getRole = async () => {
    if (role_id) {
      return role_id;
    }

    const { rows } = await db.query(
      "SELECT id FROM roles WHERE role_name = 'Sales'"
    );
    return rows[0].id;
  };
  const role = await getRole();

  const { rows: user_rows } = await db.query(
    "INSERT INTO users(username, email, phone) VALUES ($1, $2, $3) RETURNING *",
    [username, email, phone]
  );
  const user = user_rows[0];

  await db.query(
    "INSERT INTO assigned_roles(role_id, user_id) VALUES ($1, $2)",
    [role, user.id]
  );

  const user_roles = await getUserRoles(user.id);
  const new_user = getUserSchema(user, user_roles);

  return response.status(200).json(new_user);
});

module.exports = router;
