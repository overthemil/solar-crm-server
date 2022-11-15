const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");

router.get("/", authenticate, async (request, response, next) => {
  const sql_query = `
    SELECT * FROM installers;
  `;

  const { rows } = await db.query(sql_query);

  return response.status(200).json({ data: rows });
});

router.post("/", authenticate, async (request, response, next) => {
  const { accreditation, licence, full_name, email, phone, expiry, address } =
    request.body;

  const sql_query = `
    INSERT INTO installers(accreditation, licence, full_name, email, phone, expiry, address) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

  const { rows } = await db.query(sql_query, [
    accreditation,
    licence,
    full_name,
    email,
    phone,
    expiry,
    address,
  ]);

  return response.status(201).json({ data: rows[0] });
});

module.exports = router;
