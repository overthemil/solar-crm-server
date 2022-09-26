const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");

router.get("/", authenticate, async (request, response, next) => {
  const { active } = request.query;

  const getQuery = () => {
    if (active) {
      return {
        sql_query:
          "SELECT id, role_name as name, active FROM roles WHERE active=TRUE ORDER BY id ASC",
        values: [],
      };
    }

    return {
      sql_query:
        "SELECT id, role_name as name, active  FROM roles ORDER BY id ASC",
      values: [],
    };
  };
  const { sql_query, values } = getQuery();
  const { rows } = await db.query(sql_query, values);
  return response.status(200).json(rows);
});

router.patch(
  "/:id",
  authenticate,
  authorize(["System Administrator", "Manager"]),
  async (request, response, next) => {
    const { id } = request.params;
    const { active } = request.body;

    const sql_query = `
    UPDATE roles SET
      active = COALESCE($1, active)
    WHERE id = $2 RETURNING *
  `;
    const values = [active, id];

    const { rows } = await db.query(sql_query, values);
    return response.status(200).json(rows[0]);
  }
);

module.exports = router;
