const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");
const { getLeadsQuery, getLeadQuery } = require("../../queries/lead");
const { getLeadSchemaSummary, getLeadSchema } = require("../../schema/lead");

router.get("/", authenticate, async (request, response, next) => {
  const { rows } = await db.query(getLeadsQuery());
  const leads = await Promise.all(
    rows.map(async (data) => {
      return getLeadSchemaSummary(data);
    })
  );

  return response.status(200).json({ data: leads });
});

router.post("/", authenticate, async (request, response, next) => {
  const {
    first_name,
    last_name,
    company_name,
    company_abn,
    email,
    phone,
    sales_id,
    source_id,
    description,
    street,
    suburb,
    state,
    postcode,
  } = request.body;

  const sql_query = `INSERT INTO leads (first_name, last_name, company_name, company_abn, 
                            email, phone, sales_id, source_id, description, street, suburb, state, postcode, created_by, reference) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, (SELECT count FROM lead_sources WHERE id=$8)) RETURNING id`;

  const { rows } = await db.query(sql_query, [
    first_name,
    last_name,
    company_name,
    company_abn,
    email,
    phone,
    sales_id,
    source_id,
    description,
    street,
    suburb,
    state,
    postcode,
    request.user.id,
  ]);

  const { rows: leadRows } = await db.query(getLeadQuery(), [rows[0].id]);
  const { rows: itemRows } = await db.query(getLeadSystemItems(), [rows[0].id]);
  const lead = getLeadSchema(leadRows[0], itemRows);

  return response.status(200).json({ data: lead });
});

module.exports = router;
