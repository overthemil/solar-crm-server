const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");

router.get("/", authenticate, async (request, response, next) => {
  const sql_query =
    "SELECT id, role_name as label, active FROM roles ORDER BY ord ASC";
  const values = [];

  const { rows } = await db.query(sql_query, values);

  return response.status(200).json({ data: rows });
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
    WHERE id = $2 RETURNING id, role_name as label, active
  `;
    const values = [active, id];

    const { rows } = await db.query(sql_query, values);
    return response.status(200).json({ data: rows[0] });
  }
);

module.exports = router;
