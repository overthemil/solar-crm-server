const router = require("express-promise-router")();

const db = require("../../../db");
const { authenticate, authorize } = require("../../../middleware/auth");
const { getLeadSchema } = require("../../../schema/lead");

const getLeadQuery = () => {
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
        l.state as state_id,
        l.postcode,
        l.source_id,
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
        l.reference,
        l.nmi,
        l.meter,
        l.property_comment,
        l.retailer,
        l.distributor,
        l.create_date,
        l.last_updated
    FROM leads l
        LEFT JOIN lead_sources ls on l.source_id = ls.id
        LEFT JOIN users s on l.sales_id = s.id
        LEFT JOIN users c on l.created_by = c.id
        LEFT JOIN lead_status ls2 on l.status_id = ls2.id
        LEFT JOIN states s2 on l.state = s2.id
    WHERE l.id = $1
  `;
  return sql_query;
};

router.get("/:id", authenticate, async (request, response, next) => {
  const { id } = request.params;

  const { rows } = await db.query(getLeadQuery(), [id]);

  if (rows.length === 0) {
    return response.status(404).json({ message: "Not found" });
  }

  const lead = getLeadSchema(rows[0]);

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
        status_id = COALESCE($40, status_id)
      WHERE id=$41; 
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
    id,
  ];
  await db.query(sql_query, sql_values);

  const { rows } = await db.query(getLeadQuery(), [id]);
  if (rows.length === 0) {
    return response.status(404).json({ message: "Not found" });
  }

  const lead = getLeadSchema(rows[0]);

  return response.status(200).json({ data: lead });
});

module.exports = router;
