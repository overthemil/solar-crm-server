const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");

router.get("/", authenticate, async (request, response, next) => {
  const sql_query = `SELECT id, source_name as label, reference, count, active FROM lead_sources ORDER BY ord ASC`;

  const { rows } = await db.query(sql_query);

  return response.status(200).json(rows);
});

router.post("/", authenticate, async (request, response, next) => {
  const { label, reference } = request.body;

  const sql_query =
    "INSERT INTO lead_sources(source_name, reference) VALUES ($1, $2) RETURNING id, source_name as label, reference, count, active";
  const values = [label, reference];

  const { rows } = await db.query(sql_query, values);
  return response.status(201).json(rows[0]);
});

router.get("/:id", authenticate, async (request, response, next) => {
  const { id } = request.params;

  const { rows } = await db.query(
    "SELECT id, source_name as label, reference, count, active FROM lead_sources WHERE id = $1",
    [id]
  );
  if (rows.length === 0) {
    return response.status(404).send("Not found");
  }
  return response.status(200).json(rows[0]);
});

router.put("/:id", authenticate, async (request, response, next) => {
  const { id } = request.params;
  const { label, reference, count, active } = request.body;

  const sql_query = `
    UPDATE lead_sources SET
      source_name = COALESCE($1, source_name),
      reference = COALESCE($2, reference),
      count = COALESCE($3, count),
      active = COALESCE($4, active)
    WHERE id = $5 RETURNING id, source_name as label, reference, count, active 
  `;
  const values = [label, reference, count, active, id];

  const { rows } = await db.query(sql_query, values);
  if (rows.length === 0) {
    return response.status(404).send("Not found");
  }

  return response.status(200).json(rows[0]);
});

module.exports = router;
