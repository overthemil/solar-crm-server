const db = require("../../db");
var router = require("express-promise-router")();

router.get("/", async (request, response, next) => {
  const { active } = request.query;

  const getQuery = () => {
    if (active === "true") {
      return {
        sql_query: "SELECT * FROM roles WHERE active=TRUE ORDER BY id ASC",
        values: [],
      };
    } else if (active === "false") {
      return {
        sql_query: "SELECT * FROM roles WHERE active=FALSE ORDER BY id ASC",
        values: [],
      };
    }

    return { sql_query: "SELECT * FROM roles ORDER BY id ASC", values: [] };
  };
  const { sql_query, values } = getQuery();
  const { rows } = await db.query(sql_query, values);
  return response.status(200).json(rows);
});

router.patch("/:id", async (request, response, next) => {
  const { id } = request.params;
  const { role_name, active } = request.body;

  const sql_query = `
    UPDATE roles SET
      role_name = COALESCE($1, role_name),
      active = COALESCE($2, active)
    WHERE id = $3 RETURNING *;
  `;
  const values = [role_name, active, id];

  const { rows } = await db.query(sql_query, values);
  return response.status(200).json(rows);
});

module.exports = router;
