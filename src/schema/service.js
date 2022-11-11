const getServiceSchema = (data, items) => {
  const schema = {
    id: data.id,
    customer: {
      id: data.customer_id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      company_name: data.company_name,
      company_abn: data.company_abn,
    },
    property: {
      address: `${data.street}, ${data.suburb} ${data.state_name} ${data.postcode}`,
      street: data.street,
      suburb: data.suburb,
      state: data.state_name,
      postcode: data.postcode,
      state_id: data.state_id,
    },
    visit: {
      scheduled: data.visit_scheduled,
      date: data.visit_scheduled ? data.visit : null,
    },
    finance: {
      paid: data.paid,
      status: data.paid ? "Paid" : "Unpaid",
    },
    status: {
      id: data.status_id,
      label: data.status,
      colour: data.status_colour,
    },
    items: items.map((item) => {
      return {
        id: item.id,
        description: item.description,
        price: item.price,
      };
    }),
  };
  return schema;
};

const getServiceSchemaSummary = (data) => {
  const schema = {
    id: data.id,
    customer: {
      id: data.customer_id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      company_name: data.company_name,
      company_abn: data.company_abn,
    },
    address: {
      full: `${data.street}, ${data.suburb} ${data.state_name} ${data.postcode}`,
      street: data.street,
      suburb: data.suburb,
      state: data.state_name,
      postcode: data.postcode,
      state_id: data.state_id,
    },
    visit: {
      scheduled: data.visit_scheduled,
      date: data.visit_scheduled ? data.visit : null,
    },
    finance: {
      paid: data.paid,
      status: data.paid ? "Paid" : "Unpaid",
    },
    status: {
      id: data.status_id,
      label: data.status,
      colour: data.status_colour,
    },
  };
  return schema;
};

module.exports.getServiceSchema = getServiceSchema;
module.exports.getServiceSchemaSummary = getServiceSchemaSummary;
