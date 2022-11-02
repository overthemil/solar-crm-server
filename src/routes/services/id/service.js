const router = require("express-promise-router")();

const db = require("../../../db");
const { authenticate, authorize } = require("../../../middleware/auth");
const { getServiceSchema } = require("../../../schema/service");

router.get("/:id", authenticate, async (request, response, next) => {
  const { id } = request.params;

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
        s2.option_name as state_name
    FROM services s
        LEFT JOIN service_status ss on ss.id = s.status_id
        LEFT JOIN customers c on c.id = s.customer_id
        LEFT JOIN states s2 on s.state = s2.id
    WHERE s.id = $1
  `;

  const { rows } = await db.query(sql_query, [id]);

  const { rows: items } = await db.query(
    "SELECT * FROM service_items WHERE service_id = $1 ORDER BY price DESC",
    [id]
  );

  const service = getServiceSchema(rows[0], items);

  return response.status(200).json({ data: service });
});

router.patch("/:id", authenticate, async (request, response) => {
  const {
    visit_scheduled,
    visit,
    paid,
    customer_id,
    street,
    suburb,
    state,
    postcode,
    description,
    status_id,
  } = request.body;
  const { id } = request.params;

  const sql_query = `
      UPDATE services SET
        visit_scheduled = COALESCE($1, visit_scheduled),
        visit = COALESCE($2, visit),
        paid = COALESCE($3, paid),
        customer_id = COALESCE($4, customer_id),
        street = COALESCE($5, street),
        suburb = COALESCE($6, suburb),
        state = COALESCE($7, state),
        postcode = COALESCE($8, postcode),
        description = COALESCE($9, description),
        status_id = COALESCE($10, status_id)
      WHERE id=$11 RETURNING *;
    `;
  const sql_values = [
    visit_scheduled,
    visit,
    paid,
    customer_id,
    street,
    suburb,
    state,
    postcode,
    description,
    status_id,
    id,
  ];
  const { rows } = await db.query(sql_query, sql_values);

  return response.status(200).json({ data: rows[0] });
});

router.post("/:id/items", authenticate, async (request, response, next) => {
  const { id } = request.params;
  const { description, price } = request.body;

  const sql_query = `
    INSERT INTO service_items(description, service_id, price) VALUES($1, $2, $3) RETURNING *;
  `;

  const { rows } = await db.query(sql_query, [description, id, price]);

  return response.status(200).json({ data: rows[0] });
});

router.patch("/:id/items", authenticate, async (request, response) => {
  const { item_id, description, price } = request.body;
  const { id } = request.params;

  const sql_query = `
      UPDATE service_items SET
        description = COALESCE($1, description),
        price = COALESCE($2, price)
      WHERE id=$3 RETURNING *;
    `;
  const sql_values = [description, price, item_id];
  const { rows } = await db.query(sql_query, sql_values);

  return response.status(200).json({ data: rows[0] });
});

module.exports = router;
