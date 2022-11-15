const getInstallQuery = () => {
  const sql_query = `
        SELECT i.id,
            i.lead_id,
            i.reference,
            i.deposit_paid,
            i.deposit_amount,
            i.deposit_paid_date,
            i.invoice_paid,
            i.invoice_amount,
            i.invoice_paid_date,
            i.ptc_form_sent,
            i.ptc_form_sent_date,
            i.ptc_approval_date,
            i.ptc_number,
            i.ptc_condition,
            i.ptc_exempted,
            i.ptc_approved,
            i.inspection_exempted,
            i.inspection_completed,
            i.inspection_booked,
            i.inspection_booked_date,
            i.inspection_completed_date,
            i.inspection_name,
            i.inspection_licence,
            i.inspection_ces,
            i.review_approved,
            i.review_approved_date,
            i.review_comment,
            i.review_by    as reviewer_id,
            u.username     as reviewer,
            i.retailer_notice_complete,
            i.retailer_notice_date,
            i.schedule,
            i.schedule_end,
            i.install_scheduled,
            i.installer_id,
            i2.full_name   as installer,
            i.customer_id,
            c.first_name,
            c.last_name,
            c.email,
            c.phone,
            c.company_name,
            c.company_abn,
            i.street,
            i.suburb,
            s.option_name  as state,
            i.state        as state_id,
            i.postcode,
            i.phase_id,
            p.option_name  as phase,
            i.existing_system_id,
            es.option_name as existing_system,
            i.roof_type_id,
            rt.option_name as roof_type,
            i.roof_pitch_id,
            rp.option_name as roof_pitch,
            i.story_id     as stories_id,
            s2.option_name as stories,
            i.property_comment,
            i.system_size,
            i.panel_design,
            i.proposal,
            i.selling_price,
            i.base_price,
            i.rebate_applied,
            i.rebate_type,
            i.rebate_expiry,
            i.rebate_attachment,
            i.finance_applied,
            i.finance_amount,
            i.finance_interest,
            i.finance_terms,
            i.finance_repayment,
            i.finance_institution,
            i.finance_attachment,
            i.create_date,
            i.last_updated
        FROM installs i
            LEFT JOIN users u on i.review_by = u.id
            LEFT JOIN installers i2 on i.installer_id = i2.id
            LEFT JOIN customers c on i.customer_id = c.id
            LEFT JOIN states s on i.state = s.id
            LEFT JOIN phases p on i.phase_id = p.id
            LEFT JOIN existing_system es on i.existing_system_id = es.id
            LEFT JOIN roof_types rt on i.roof_type_id = rt.id
            LEFT JOIN roof_pitch rp on i.roof_pitch_id = rp.id
            LEFT JOIN stories s2 on i.story_id = s2.id
    `;
  return sql_query;
};

module.exports.getInstallQuery = getInstallQuery;
