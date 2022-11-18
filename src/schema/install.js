const getInstallSchema = (data, items) => {
  const schema = {
    id: data.id,
    lead: data.lead_id,
    ref: data.reference,
    customer: {
      first_name: data.first_name,
      last_name: data.last_name,
      name: `${data.first_name} ${data.last_name}`,
      company_name: data.company_name,
      company_abn: data.company_abn,
      email: data.email,
      phone: data.phone,
    },
    address: {
      street: data.street,
      suburb: data.suburb,
      state: data.state,
      postcode: data.postcode,
      full: `${data.street || ""}, ${data.suburb || ""} ${data.state || ""} ${
        data.postcode || ""
      }`,
      state_id: data.state_id,
    },
    property: {
      phase_id: data.phase_id,
      phase: data.phase,
      existing_system_id: data.existing_system_id,
      existing_system: data.existing_system,
      roof_type_id: data.roof_type_id,
      roof_type: data.roof_type,
      roof_pitch_id: data.roof_pitch_id,
      roof_pitch: data.roof_pitch,
      stories_id: data.stories_id,
      stories: data.stories,
      comment: data.property_comment,
    },
    system: {
      size: data.system_size,
      panel_design: data.panel_design,
      proposal: data.proposal,
      items,
    },
    finance: {
      selling_price: data.selling_price,
      base_price: data.base_price,
      rebate: {
        applied: data.rebate_applied,
        type: data.rebate_applied ? data.rebate_type : null,
        expiry: data.rebate_applied ? data.rebate_expiry : null,
        attachment: data.rebate_applied ? data.rebate_attachment : null,
      },
      financing: {
        applied: data.finance_applied,
        amount: data.finance_applied ? data.finance_amount : null,
        interest: data.finance_applied ? data.finance_interest : null,
        terms: data.finance_applied ? data.finance_terms : null,
        repayment: data.finance_applied ? data.finance_repayment : null,
        institution: data.finance_applied ? data.finance_institution : null,
        attachment: data.finance_applied ? data.finance_attachment : null,
      },
    },
    deposit: {
      paid: data.deposit_paid,
      amount: data.deposit_paid ? data.deposit_amount : null,
      paid_date: data.deposit_paid ? data.deposit_paid_date : null,
    },
    invoice: {
      paid: data.invoice_paid,
      amount: data.invoice_paid ? data.invoice_amount : null,
      paid_date: data.invoice_paid ? data.invoice_paid_date : null,
    },
    ptc: {
      sent: data.ptc_form_sent,
      sent_date: data.ptc_form_sent ? data.ptc_form_sent_date : null,
      approved: data.ptc_approved,
      approval_date: data.ptc_approved ? data.ptc_approval_date : null,
      number: data.ptc_approved ? data.ptc_number : null,
      condition: data.ptc_approved ? data.ptc_condition : null,
      exempted: data.ptc_approved ? data.ptc_exempted : null,
    },
    inspection: {
      exempted: data.inspection_exempted,
      completed: data.inspection_completed,
      booked: data.inspection_booked,
      booked_date: data.inspection_booked ? data.inspection_booked_date : null,
      completed_date: data.inspection_completed
        ? data.inspection_completed_date
        : null,
      ces: data.inspection_completed ? data.inspection_ces : null,
      inspector: {
        name: data.inspection_completed ? data.inspection_name : null,
        licence: data.inspection_completed ? data.inspection_licence : null,
      },
    },
    review: {
      approved: data.review_approved,
      approved_date: data.review_approved ? data.review_approved_date : null,
      comment: data.review_approved ? data.review_comment : null,
      reviewer: {
        id: data.review_approved ? data.reviewer_id : null,
        label: data.review_approved ? data.reviewer : null,
      },
    },
    retailer_notice: {
      complete: data.retailer_notice_complete,
      date: data.retailer_notice_complete ? data.retailer_notice_date : null,
    },
    schedule: {
      scheduled: data.install_scheduled,
      date: data.install_scheduled ? data.schedule : null,
      end:
        data.install_scheduled && data.schedule_end ? data.schedule_end : null,
      installer: {
        id: data.installer_id,
        label: data.installer,
      },
    },
    stc: {
      submitted: data.stc_submitted,
      submission_date: data.stc_submission_date,
      submission_numbers: data.stc_submission_numbers,
      submitter: {
        id: data.stc_submitter_id,
        label: data.stc_submitter,
      },
      submitted_through: data.stc_submitted_through,
      comment: data.stc_comment,
      form: data.stc_form,
      receipt: data.stc_receipt_number,
      approver: {
        id: data.stc_approved_id,
        label: data.stc_approver,
      },
      approved: {
        received: data.stc_approval_received,
        date: data.stc_approval_received ? data.stc_approval_date : null,
        numbers: data.stc_approval_received ? data.stc_approved_numbers : null,
        values: data.stc_approval_received ? data.stc_approved_values : null,
      },
    },
    create_date: data.create_date,
    last_updated: data.last_updated,
  };
  return schema;
};

const getInstallSummarySchema = (data) => {
  const schema = {
    id: data.id,
    ref: data.reference,
    customer: {
      first_name: data.first_name,
      last_name: data.last_name,
      name: `${data.first_name} ${data.last_name}`,
      company_name: data.company_name,
      company_abn: data.company_abn,
      email: data.email,
      phone: data.phone,
    },
    address: {
      street: data.street,
      suburb: data.suburb,
      state: data.state,
      postcode: data.postcode,
      full: `${data.street || ""}, ${data.suburb || ""} ${data.state || ""} ${
        data.postcode || ""
      }`,
      state_id: data.state_id,
    },
    system: {
      size: data.system_size,
      panel_design: data.panel_design,
      proposal: data.proposal,
    },
    finance: {
      selling_price: data.selling_price,
      base_price: data.base_price,
      rebate: {
        applied: data.rebate_applied,
        type: data.rebate_applied ? data.rebate_type : null,
        expiry: data.rebate_applied ? data.rebate_expiry : null,
        attachment: data.rebate_applied ? data.rebate_attachment : null,
      },
      financing: {
        applied: data.finance_applied,
        amount: data.finance_applied ? data.finance_amount : null,
        interest: data.finance_applied ? data.finance_interest : null,
        terms: data.finance_applied ? data.finance_terms : null,
        repayment: data.finance_applied ? data.finance_repayment : null,
        institution: data.finance_applied ? data.finance_institution : null,
        attachment: data.finance_applied ? data.finance_attachment : null,
      },
    },
    deposit: {
      paid: data.deposit_paid,
      amount: data.deposit_paid ? data.deposit_amount : null,
      paid_date: data.deposit_paid ? data.deposit_paid_date : null,
    },
    invoice: {
      paid: data.invoice_paid,
      amount: data.invoice_paid ? data.invoice_amount : null,
      paid_date: data.invoice_paid ? data.invoice_paid_date : null,
    },
    ptc: {
      sent: data.ptc_form_sent,
      approved: data.ptc_approved,
      exempted: data.ptc_approved ? data.ptc_exempted : null,
    },
    inspection: {
      exempted: data.inspection_exempted,
      completed: data.inspection_completed,
      booked: data.inspection_booked,
    },
    review: {
      approved: data.review_approved,
    },
    retailer_notice: {
      complete: data.retailer_notice_complete,
    },
    schedule: {
      scheduled: data.install_scheduled,
      date: data.install_scheduled ? data.schedule : null,
      end:
        data.install_scheduled && data.schedule_end ? data.schedule_end : null,
      installer: {
        id: data.installer_id,
        label: data.installer,
      },
    },
    stc: {
      submitted: data.stc_submitted,
      submission_date: data.stc_submission_date,
      submission_numbers: data.stc_submission_numbers,
      submitter: {
        id: data.stc_submitter_id,
        label: data.stc_submitter,
      },
      submitted_through: data.stc_submitted_through,
      comment: data.stc_comment,
      form: data.stc_form,
      receipt: data.stc_receipt_number,
      approver: {
        id: data.stc_approved_id,
        label: data.stc_approver,
      },
      approved: {
        received: data.stc_approval_received,
        date: data.stc_approval_received ? data.stc_approval_date : null,
        numbers: data.stc_approval_received ? data.stc_approved_numbers : null,
        values: data.stc_approval_received ? data.stc_approved_values : null,
      },
    },
    create_date: data.create_date,
    last_updated: data.last_updated,
  };
  return schema;
};

module.exports.getInstallSchema = getInstallSchema;
module.exports.getInstallSummarySchema = getInstallSummarySchema;
