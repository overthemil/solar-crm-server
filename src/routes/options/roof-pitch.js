const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");

const table_name = "roof_pitch";

router.get("/", authenticate, async (request, response, next) => {
  const sql_query = `SELECT id, option_name as label, active FROM ${table_name} ORDER BY ord ASC`;

  const { rows } = await db.query(sql_query);

  return response.status(200).json({ data: rows });
});

router.get("/:id", authenticate, async (request, response, next) => {
  const { id } = request.params;

  const sql_query = `SELECT id, option_name as label, active FROM ${table_name} WHERE id=$1`;

  const { rows } = await db.query(sql_query, [id]);

  return response.status(200).json({ data: rows });
});

router.post(
  "/",
  authenticate,
  authorize(["System Administrator", "Manager"]),
  async (request, response, next) => {
    const { label } = request.body;

    const { rows } = await db.query(
      `INSERT INTO ${table_name}(option_name) VALUES ($1) RETURNING id, option_name as label, active`,
      [label]
    );

    return response.status(201).json({ data: rows[0] });
  }
);

router.patch(
  "/:id",
  authenticate,
  authorize(["System Administrator", "Manager"]),
  async (request, response, next) => {
    const { id } = request.params;
    const { label, active } = request.body;

    const { rows: option_rows } = await db.query(
      `SELECT * FROM ${table_name} WHERE id = $1`,
      [id]
    );
    if (option_rows.length === 0) {
      return response.status(404).json({ message: "Not found" });
    }

    const sql_query = `
    UPDATE ${table_name} SET
      option_name = COALESCE($1, option_name),
      active = COALESCE($2, active)
    WHERE id = $3 RETURNING id, option_name as label, active
  `;
    const values = [label, active, id];

    const { rows } = await db.query(sql_query, values);
    return response.status(200).json({ data: rows[0] });
  }
);

module.exports = router;
