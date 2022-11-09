const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");
const { getLeadSchemaSummary } = require("../../schema/lead");

router.get("/", authenticate, async (request, response, next) => {
  const sql_query = `
        SELECT
            l.id,
            l.description,
            l.first_name,
            l.last_name,
            l.company_name,
            l.company_abn,
            l.email,
            l.phone,
            l.street,
            l.suburb,
            s2.option_name as state,
            l.postcode,
            ls.id as lead_source,
            ls.source_name as source,
            ls.reference as source_ref,
            l.sales_id,
            s.username as sales,
            l.created_by,
            c.username as creator,
            l.system_size,
            l.status_id,
            ls2.status_name as status,
            ls2.colour as status_colour,
            l.create_date,
            l.last_updated
        FROM leads l
            LEFT JOIN lead_sources ls on l.source_id = ls.id
            LEFT JOIN users s on l.sales_id = s.id
            LEFT JOIN users c on l.created_by = c.id
            LEFT JOIN lead_status ls2 on l.status_id = ls2.id
            LEFT JOIN states s2 on l.state = s2.id;
    `;

  const { rows } = await db.query(sql_query);

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

  return response.status(201).json({ data: rows[0] });
});

module.exports = router;
