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

module.exports.getLeadQuery = getLeadQuery;
module.exports.getLeadsQuery = getLeadsQuery;
