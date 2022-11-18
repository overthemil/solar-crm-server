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

const getLeadSchema = (lead, items, extras) => {
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
    property: {
      phase_id: lead.phase_id,
      phase: lead.phase,
      existing_system_id: lead.existing_system_id,
      existing_system: lead.existing_system,
      roof_type_id: lead.roof_type_id,
      roof_type: lead.roof_type,
      roof_pitch_id: lead.roof_pitch_id,
      roof_pitch: lead.roof_pitch,
      stories_id: lead.stories_id,
      stories: lead.stories,
      comment: lead.property_comment,
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
    finance: {
      selling_price: lead.selling_price,
      base_price: lead.base_price,
      rebate: {
        applied: lead.rebate_applied,
        type: lead.rebate_applied ? lead.rebate_type : null,
        expiry: lead.rebate_applied ? lead.rebate_expiry : null,
        attachment: lead.rebate_applied ? lead.rebate_attachment : null,
      },
      financing: {
        applied: lead.finance_applied,
        amount: lead.finance_applied ? lead.finance_amount : null,
        interest: lead.finance_applied ? lead.finance_interest : null,
        terms: lead.finance_applied ? lead.finance_terms : null,
        repayment: lead.finance_applied ? lead.finance_repayment : null,
        institution: lead.finance_applied ? lead.finance_institution : null,
        attachment: lead.finance_applied ? lead.finance_attachment : null,
      },
    },
    created_by: {
      id: lead.created_by,
      name: lead.creator,
    },
    system: {
      size: lead.system_size,
      panel_design: lead.panel_design,
      proposal: lead.proposal,
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
      distributor: lead.distributor,
    },
    extras,
    create_date: lead.create_date,
    last_updated: lead.last_updated,
  };
  return schema;
};

module.exports.getLeadSchemaSummary = getLeadSchemaSummary;
module.exports.getLeadSchema = getLeadSchema;
