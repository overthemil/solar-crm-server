const router = require("express-promise-router")();

const db = require("../../../db");
const { authenticate, authorize } = require("../../../middleware/auth");
const { getLeadQuery, getLeadSystemItems } = require("../../../queries/lead");
const { getLeadSchema } = require("../../../schema/lead");

router.get("/:id", authenticate, async (request, response, next) => {
  const { id } = request.params;

  const { rows } = await db.query(getLeadQuery(), [id]);

  if (rows.length === 0) {
    return response.status(404).json({ message: "Not found" });
  }
  const { rows: itemRows } = await db.query(getLeadSystemItems(), [id]);

  const lead = getLeadSchema(rows[0], itemRows);

  return response.status(200).json({ data: lead });
});

router.patch("/:id", authenticate, async (request, response) => {
  const {
    first_name,
    last_name,
    company_name,
    company_abn,
    street,
    suburb,
    state,
    postcode,
    email,
    phone,
    description,
    source_id,
    nmi,
    meter,
    property_comment,
    retailer,
    reference,
    system_size,
    selling_price,
    base_price,
    distributor,
    phase_id,
    story_id,
    existing_system_id,
    roof_type_id,
    roof_pitch_id,
    sales_id,
    panel_design,
    rebate_applied,
    rebate_type,
    rebate_expiry,
    rebate_attachment,
    finance_applied,
    finance_amount,
    finance_interest,
    finance_terms,
    finance_repayment,
    finance_institution,
    finance_attachment,
    status_id,
    proposal,
  } = request.body;
  const { id } = request.params;

  const sql_query = `
      UPDATE leads SET
        first_name = COALESCE($1, first_name),
        last_name = COALESCE($2, last_name),
        company_name = COALESCE($3, company_name),
        company_abn = COALESCE($4, company_abn),
        street = COALESCE($5, street),
        suburb = COALESCE($6, suburb),
        state = COALESCE($7, state),
        postcode = COALESCE($8, postcode),
        email = COALESCE($9, email),
        phone = COALESCE($10, phone),
        description = COALESCE($11, description),
        source_id = COALESCE($12, source_id),
        nmi = COALESCE($13, nmi),
        meter = COALESCE($14, meter),
        property_comment = COALESCE($15, property_comment),
        retailer = COALESCE($16, retailer),
        reference = COALESCE($17, reference),
        system_size = COALESCE($18, system_size),
        selling_price = COALESCE($19, selling_price),
        base_price = COALESCE($20, base_price),
        distributor = COALESCE($21, distributor),
        phase_id = COALESCE($22, phase_id),
        story_id = COALESCE($23, story_id),
        existing_system_id = COALESCE($24, existing_system_id),
        roof_type_id = COALESCE($25, roof_type_id),
        roof_pitch_id = COALESCE($26, roof_pitch_id),
        sales_id = COALESCE($27, sales_id),
        panel_design = COALESCE($28, panel_design),
        rebate_applied = COALESCE($29, rebate_applied),
        rebate_type = COALESCE($30, rebate_type),
        rebate_expiry = COALESCE($31, rebate_expiry),
        rebate_attachment = COALESCE($32, rebate_attachment),
        finance_applied = COALESCE($33, finance_applied),
        finance_amount = COALESCE($34, finance_amount),
        finance_interest = COALESCE($35, finance_interest),
        finance_terms = COALESCE($36, finance_terms),
        finance_repayment = COALESCE($37, finance_repayment),
        finance_institution = COALESCE($38, finance_institution),
        finance_attachment = COALESCE($39, finance_attachment),
        status_id = COALESCE($40, status_id),
        proposal = COALESCE($41, proposal)
      WHERE id=$42; 
    `;
  const sql_values = [
    first_name,
    last_name,
    company_name,
    company_abn,
    street,
    suburb,
    state,
    postcode,
    email,
    phone,
    description,
    source_id,
    nmi,
    meter,
    property_comment,
    retailer,
    reference,
    system_size,
    selling_price,
    base_price,
    distributor,
    phase_id,
    story_id,
    existing_system_id,
    roof_type_id,
    roof_pitch_id,
    sales_id,
    panel_design,
    rebate_applied,
    rebate_type,
    rebate_expiry,
    rebate_attachment,
    finance_applied,
    finance_amount,
    finance_interest,
    finance_terms,
    finance_repayment,
    finance_institution,
    finance_attachment,
    status_id,
    proposal,
    id,
  ];
  await db.query(sql_query, sql_values);

  const { rows } = await db.query(getLeadQuery(), [id]);
  if (rows.length === 0) {
    return response.status(404).json({ message: "Not found" });
  }
  const { rows: itemRows } = await db.query(getLeadSystemItems(), [id]);

  const lead = getLeadSchema(rows[0], itemRows);

  return response.status(200).json({ data: lead });
});

router.post("/:id/system", authenticate, async (request, response, next) => {
  const { item_id, amount } = request.body;
  const { id } = request.params;

  const sql_query = `INSERT INTO leads_stock_items (lead_id, item_id, amount)
                    VALUES ($1, $2, $3)`;

  await db.query(sql_query, [id, item_id, amount]);

  const { rows: itemRows } = await db.query(getLeadSystemItems(), [id]);

  const { rows: leadRows } = await db.query(getLeadQuery(), [id]);
  const lead = getLeadSchema(leadRows[0], itemRows);

  return response.status(200).json({ data: lead });
});

router.delete(
  "/:id/system/:item",
  authenticate,
  async (request, response, next) => {
    const { id, item } = request.params;

    const sql_query = `
    DELETE FROM leads_stock_items WHERE id = $1 AND lead_id = $2
  `;

    await db.query(sql_query, [item, id]);

    return response.status(200).json({ message: "Item Deleted" });
  }
);

router.patch(
  "/:id/system/:item",
  authenticate,
  async (request, response, next) => {
    const { amount } = request.body;
    const { id, item } = request.params;

    const sql_query = `
    UPDATE leads_stock_items SET
        amount = COALESCE($1, amount)
    WHERE id = $2 AND lead_id = $3 RETURNING *; 
  `;

    const { rows } = await db.query(sql_query, [amount, item, id]);

    return response.status(200).json({ data: rows[0] });
  }
);

router.get("/:id/logs", authenticate, async (request, response, next) => {
  const { id } = request.params;

  const sql_query = `
    SELECT sl.id      as id,
       sl.msg,
       sl.auto,
       sl.created_by  as created_by,
       sl.lead_status_id as status_id,
       ss.status_name as status,
       ss.colour      as status_colour,
       sl.create_date
    FROM lead_logs sl
         LEFT JOIN lead_status ss on ss.id = sl.lead_status_id
    WHERE lead_id = $1 ORDER BY sl.create_date DESC;
  `;

  const { rows } = await db.query(sql_query, [id]);

  return response.status(200).json({ data: rows });
});

router.post("/:id/logs", authenticate, async (request, response, next) => {
  const { id } = request.params;
  const { msg, auto = true } = request.body;

  const sql_query = `
    INSERT INTO lead_logs(lead_id, msg, auto, created_by, lead_status_id) 
    VALUES ($1, $2, $3, $4, (SELECT status_id FROM leads WHERE id=$1)) RETURNING *;
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
