const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");
const { getServiceSchemaSummary } = require("../../schema/service");

router.get("/", authenticate, async (request, response, next) => {
  const sql_query = `
    SELECT s.*,
        ss.status_name as status,
        ss.colour      as status_colour,
        c.first_name,
        c.last_name,
        c.email,
        c.company_name,
        c.company_abn,
        c.phone,
        s2.option_name as state_name,
        s2.id as state_id
    FROM services s
        LEFT JOIN service_status ss on ss.id = s.status_id
        LEFT JOIN customers c on c.id = s.customer_id
        LEFT JOIN states s2 on s.state = s2.id
    ORDER BY create_date DESC;
  `;

  const { rows } = await db.query(sql_query);

  const services = await Promise.all(
    rows.map(async (data) => {
      const user_schema = getServiceSchemaSummary(data);

      return user_schema;
    })
  );

  return response.status(200).json({ data: services });
});

router.post("/", authenticate, async (request, response, next) => {
  const { customer_id, street, suburb, state, postcode, description } =
    request.body;

  const sql_query = `
    INSERT INTO services(customer_id, street, suburb, state, postcode, description, created_by) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

  const { rows } = await db.query(sql_query, [
    customer_id,
    street,
    suburb,
    state,
    postcode,
    description,
    request.user.id,
  ]);

  return response.status(201).json({ data: rows[0] });
});

module.exports = router;
