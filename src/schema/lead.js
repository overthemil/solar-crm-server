const getLeadSchemaSummary = (lead) => {
  const schema = {
    id: lead.id,
    description: lead.description,
    ref: `${lead.source_ref || ""}-${lead.reference}`,
    customer: {
      first_name: lead.first_name,
      last_name: lead.last_name,
      name: `${lead.first_name} ${lead.last_name}`,
      company_name: lead.company_name,
      company_abn: lead.company_abn,
      email: lead.email,
      phone: lead.phone,
    },
    address: {
      street: lead.street,
      suburb: lead.suburb,
      state: lead.state,
      postcode: lead.postcode,
      full: `${lead.street || ""}, ${lead.suburb || ""} ${lead.state || ""} ${
        lead.postcode || ""
      }`,
    },
    source: {
      id: lead.source_id,
      label: lead.source,
      ref: lead.source_ref,
    },
    sales: {
      id: lead.sales_id,
      label: lead.sales,
    },
    created_by: {
      id: lead.created_by,
      name: lead.creator,
    },
    system: {
      size: lead.system_size,
    },
    status: {
      id: lead.status_id,
      label: lead.status,
      colour: lead.status_colour,
    },
    create_date: lead.create_date,
    last_updated: lead.last_updated,
  };
  return schema;
};

const getLeadSchema = (lead, items) => {
  const schema = {
    id: lead.id,
    description: lead.description,
    ref: `${lead.source_ref || ""}-${lead.reference}`,
    customer: {
      first_name: lead.first_name,
      last_name: lead.last_name,
      name: `${lead.first_name} ${lead.last_name}`,
      company_name: lead.company_name,
      company_abn: lead.company_abn,
      email: lead.email,
      phone: lead.phone,
    },
    address: {
      street: lead.street,
      suburb: lead.suburb,
      state: lead.state,
      postcode: lead.postcode,
      full: `${lead.street || ""}, ${lead.suburb || ""} ${lead.state || ""} ${
        lead.postcode || ""
      }`,
      state_id: lead.state_id,
    },
    source: {
      id: lead.source_id,
      label: lead.source,
      ref: lead.source_ref,
    },
    sales: {
      id: lead.sales_id,
      label: lead.sales,
    },
    created_by: {
      id: lead.created_by,
      name: lead.creator,
    },
    system: {
      size: lead.system_size,
      items,
    },
    status: {
      id: lead.status_id,
      label: lead.status,
      colour: lead.status_colour,
    },
    connection: {
      nmi: lead.nmi,
      meter: lead.meter,
      retailer: lead.retailer,
      distributor: lead.ditributor,
    },
    create_date: lead.create_date,
    last_updated: lead.last_updated,
  };
  return schema;
};

module.exports.getLeadSchemaSummary = getLeadSchemaSummary;
module.exports.getLeadSchema = getLeadSchema;
