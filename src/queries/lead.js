const getLeadsQuery = () => {
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
        ORDER BY l.create_date DESC
    `;
  return sql_query;
};

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
        l.panel_design,
        l.proposal,
        l.selling_price,
        l.base_price,
        l.rebate_applied,
        l.rebate_type,
        l.rebate_expiry,
        l.rebate_attachment,
        l.finance_applied,
        l.finance_amount,
        l.finance_interest,
        l.finance_terms,
        l.finance_repayment,
        l.finance_institution,
        l.finance_attachment,
        p.id as phase_id,
        p.option_name as phase,
        es.id as existing_system_id,
        es.option_name as existing_system,
        rt.id as roof_type_id,
        rt.option_name as roof_type,
        rp.id as roof_pitch_id,
        rp.option_name as roof_pitch,
        s3.id as stories_id,
        s3.option_name as stories,
        l.create_date,
        l.last_updated
    FROM leads l
        LEFT JOIN lead_sources ls on l.source_id = ls.id
        LEFT JOIN users s on l.sales_id = s.id
        LEFT JOIN users c on l.created_by = c.id
        LEFT JOIN lead_status ls2 on l.status_id = ls2.id
        LEFT JOIN states s2 on l.state = s2.id
        LEFT JOIN phases p on l.phase_id = p.id
        LEFT JOIN existing_system es on l.existing_system_id = es.id
        LEFT JOIN roof_types rt on l.roof_type_id = rt.id
        LEFT JOIN roof_pitch rp on l.roof_pitch_id = rp.id
        LEFT JOIN stories s3 on l.story_id = s3.id
    WHERE l.id = $1
  `;
  return sql_query;
};

const getLeadSystemItems = () => {
  const sql_query = `
    SELECT l.id, l.amount, si.brand, si.series, si.model
      FROM leads_stock_items l
        LEFT JOIN stock_item si on l.item_id = si.id
    WHERE l.lead_id = $1 
  `;
  return sql_query;
};

module.exports.getLeadQuery = getLeadQuery;
module.exports.getLeadsQuery = getLeadsQuery;
module.exports.getLeadSystemItems = getLeadSystemItems;
