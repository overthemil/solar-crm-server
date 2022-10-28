const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");

const table_name = "states";

router.get("/", authenticate, async (request, response, next) => {
  const sql_query = `SELECT id, option_name as label, active, reference FROM ${table_name} ORDER BY option_name ASC`;

  const { rows } = await db.query(sql_query);

  return response.status(200).json({ data: rows });
});

router.get("/:id", authenticate, async (request, response, next) => {
  const { id } = request.params;

  const sql_query = `SELECT id, option_name as label, active, reference FROM ${table_name} WHERE id=$1`;

  const { rows } = await db.query(sql_query, [id]);

  return response.status(200).json({ data: rows });
});

router.post(
  "/",
  authenticate,
  authorize(["System Administrator", "Manager"]),
  async (request, response, next) => {
    const { label, reference } = request.body;

    const { rows } = await db.query(
      `INSERT INTO ${table_name}(option_name, reference) VALUES ($1, $2) RETURNING id, option_name as label, active, reference`,
      [label, reference]
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
    const { label, active, reference } = request.body;

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
      active = COALESCE($2, active),
      reference = COALESCE($3, reference)
    WHERE id = $4 RETURNING id, option_name as label, active, reference
  `;
    const values = [label, active, reference, id];

    const { rows } = await db.query(sql_query, values);
    return response.status(200).json({ data: rows[0] });
  }
);

module.exports = router;
