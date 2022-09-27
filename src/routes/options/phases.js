const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");

router.get("/", authenticate, async (request, response, next) => {
  const sql_query =
    "SELECT id, option_name as label, active FROM phases ORDER BY ord ASC";

  const { rows } = await db.query(sql_query);

  return response.status(200).json(rows);
});

router.post("/", authenticate, async (request, response, next) => {
  const { label } = request.body;

  const { rows } = await db.query(
    "INSERT INTO phases(option_name) VALUES ($1) RETURNING id, option_name as label, active",
    [label]
  );

  return response.status(201).json(rows[0]);
});

router.patch(
  "/:id",
  authenticate,
  authorize(["System Administrator", "Manager"]),
  async (request, response, next) => {
    const { id } = request.params;
    const { label, active } = request.body;

    const sql_query = `
    UPDATE phases SET
      option_name = COALESCE($1, option_name),
      active = COALESCE($2, active)
    WHERE id = $3 RETURNING id, option_name as label, active
  `;
    const values = [label, active, id];

    const { rows } = await db.query(sql_query, values);
    return response.status(200).json(rows[0]);
  }
);

module.exports = router;
