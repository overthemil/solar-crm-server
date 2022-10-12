const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");

router.get("/", authenticate, async (request, response, next) => {
  const sql_query = `
        SELECT * FROM customers; 
    `;

  const { rows } = await db.query(sql_query);

  return response.status(200).json({ data: rows });
});

router.post("/", authenticate, async (request, response, next) => {
  const { first_name, last_name, company_name, company_abn, email, phone } =
    request.body;

  const sql_query = `
    INSERT INTO customers(first_name, last_name, company_name, company_abn, email, phone) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  const { rows } = await db.query(sql_query, [
    first_name,
    last_name,
    company_name,
    company_abn,
    email,
    phone,
  ]);

  return response.status(201).json({ data: rows[0] });
});

module.exports = router;
