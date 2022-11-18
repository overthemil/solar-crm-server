const router = require("express-promise-router")();

const db = require("../../db");
const { authenticate, authorize } = require("../../middleware/auth");
const { getInstallsQuery, getInstallQuery } = require("../../queries/install");
const { getInstallSummarySchema } = require("../../schema/install");

router.get("/", authenticate, async (request, response, next) => {
  const { rows } = await db.query(getInstallsQuery());
  const installs = await Promise.all(
    rows.map(async (data) => {
      return getInstallSummarySchema(data);
    })
  );

  return response.status(200).json({ data: installs });
});

router.post("/", authenticate, async (request, response, next) => {
  const {
    lead_id,
    customer_id,
    street,
    suburb,
    state,
    postcode,
    nmi,
    meter,
    property_comment,
    retailer,
    distributor,
    phase_id,
    story_id,
    roof_type_id,
    roof_pitch_id,
    existing_system_id,
    sales_id,
    selling_price,
    base_price,
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
    system_size,
    panel_design,
  } = request.body;

  const sqlQuery = ` INSERT INTO installs (lead_id, customer_id, street, suburb, state, postcode, nmi, meter, property_comment, retailer, distributor, 
                                          phase_id, story_id, roof_type_id, roof_pitch_id, existing_system_id, sales_id, 
                                          selling_price, base_price, rebate_applied, rebate_type, rebate_expiry, rebate_attachment,
                                          finance_applied, finance_amount, finance_interest, finance_terms, finance_repayment,
                                          finance_institution, finance_attachment, system_size, panel_design, created_by, reference)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, 
                        $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, (SELECT count FROM reference_counts WHERE description='install')) RETURNING id`;
  const values = [
    lead_id,
    customer_id,
    street,
    suburb,
    state,
    postcode,
    nmi,
    meter,
    property_comment,
    retailer,
    distributor,
    phase_id,
    story_id,
    roof_type_id,
    roof_pitch_id,
    existing_system_id,
    sales_id,
    selling_price,
    base_price,
    rebate_applied || false,
    rebate_type,
    rebate_expiry,
    rebate_attachment,
    finance_applied || false,
    finance_amount,
    finance_interest,
    finance_terms,
    finance_repayment,
    finance_institution,
    finance_attachment,
    system_size || 0,
    panel_design,
    request.user.id,
  ];
  const { rows } = await db.query(sqlQuery, values);

  await db.query(
    `UPDATE reference_counts SET count = count + 1 WHERE description='install'`
  );

  const { rows: installRows } = await db.query(getInstallQuery(), [rows[0].id]);
  const { rows: itemRows } = await db.query(getLeadSystemItems(), [rows[0].id]);
  const install = getLeadSchema(installRows[0], itemRows);

  return response.status(200).json({ data: install });
});

module.exports = router;
