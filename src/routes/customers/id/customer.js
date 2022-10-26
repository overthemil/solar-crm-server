const router = require("express-promise-router")();

const db = require("../../../db");
const { authenticate, authorize } = require("../../../middleware/auth");

router.get("/:id", authenticate, async (request, response, next) => {
  const { id } = request.params;

  const sql_query = `
    SELECT * FROM customers WHERE id = $1; 
  `;

  const { rows } = await db.query(sql_query, [id]);

  if (rows.length === 0) {
    return response.status(404).json({ message: "Not found" });
  }

  return response.status(200).json({ data: rows[0] });
});

router.patch("/:id", authenticate, async (request, response) => {
  const { first_name, last_name, company_name, company_abn, email, phone } =
    request.body;
  const { id } = request.params;

  const sql_query = `
      UPDATE customers SET
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        company_name = COALESCE($3, company_name),
        company_abn = COALESCE($4, company_abn),
        email = COALESCE($5, email),
        phone = COALESCE($6, phone)
      WHERE id=$7 RETURNING *;
    `;
  const sql_values = [
    first_name,
    last_name,
    company_name,
    company_abn,
    email,
    phone,
    id,
  ];
  const { rows } = await db.query(sql_query, sql_values);

  return response.status(200).json({ data: rows[0] });
});

router.get("/:id/logs", authenticate, async (request, response, next) => {
  const { id } = request.params;

  const sql_query = `
    SELECT * FROM customer_logs WHERE customer_id = $1 ORDER BY create_date DESC;
  `;

  const { rows } = await db.query(sql_query, [id]);

  return response.status(200).json({ data: rows });
});

router.post("/:id/logs", authenticate, async (request, response, next) => {
  const { id } = request.params;
  const { msg, auto } = request.body;

  const sql_query = `
    INSERT INTO customer_logs(customer_id, msg, auto, created_by) VALUES ($1, $2, $3, $4) RETURNING *;
  `;

  const { rows } = await db.query(sql_query, [
    id,
    msg,
    auto,
    request.user.username,
  ]);

  return response.status(200).json({ data: rows });
});

module.exports = router;
