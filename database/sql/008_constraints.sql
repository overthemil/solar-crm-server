-- ############################################################################
-- # accounts
-- ############################################################################
ALTER TABLE accounts
    ADD CONSTRAINT role_fk FOREIGN KEY (role_id) REFERENCES roles (role_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # leads
-- ############################################################################
ALTER TABLE leads
    ADD CONSTRAINT source_fk FOREIGN KEY (source_id) REFERENCES lead_source (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE leads
    ADD CONSTRAINT phase_fk FOREIGN KEY (phase_id) REFERENCES phases (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE leads
    ADD CONSTRAINT story_fk FOREIGN KEY (story_id) REFERENCES stories (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE leads
    ADD CONSTRAINT roof_type_fk FOREIGN KEY (roof_type_id) REFERENCES roof_types (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE leads
    ADD CONSTRAINT roof_pitch_fk FOREIGN KEY (roof_pitch_id) REFERENCES roof_pitch (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE leads
    ADD CONSTRAINT existing_system_fk FOREIGN KEY (existing_system_id) REFERENCES existing_system (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE leads
    ADD CONSTRAINT status_fk FOREIGN KEY (status_id) REFERENCES lead_status (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE leads
    ADD CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES accounts (account_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE leads
    ADD CONSTRAINT sales_id_fk FOREIGN KEY (sales_id) REFERENCES accounts (account_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE leads
    ADD CONSTRAINT panel_design_fk FOREIGN KEY (panel_design) REFERENCES files (id)
    ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE leads
    ADD CONSTRAINT rebate_attachment_fk FOREIGN KEY (rebate_attachment) REFERENCES files (id)
    ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE leads
    ADD CONSTRAINT finance_attachment_fk FOREIGN KEY (finance_attachment) REFERENCES files (id)
    ON UPDATE CASCADE ON DELETE SET NULL;

-- ############################################################################
-- # lead_logs
-- ############################################################################
ALTER TABLE lead_logs
    ADD CONSTRAINT lead_fk FOREIGN KEY (lead_id) REFERENCES leads (lead_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE lead_logs
    ADD CONSTRAINT lead_status_fk FOREIGN KEY (lead_status_id) REFERENCES lead_status (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # installs
-- ############################################################################
ALTER TABLE installs
    ADD CONSTRAINT installer_fk FOREIGN KEY (installer_id) REFERENCES installers (installer_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE installs
    ADD CONSTRAINT customer_fk FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE installs
    ADD CONSTRAINT status_fk FOREIGN KEY (status_id) REFERENCES install_status (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE installs
    ADD CONSTRAINT sales_fk FOREIGN KEY (sales_id) REFERENCES accounts(account_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE installs
    ADD CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES accounts(account_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE installs
    ADD CONSTRAINT lead_fk FOREIGN KEY (lead_id) REFERENCES leads(lead_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE installs
    ADD CONSTRAINT review_by_fk FOREIGN KEY (review_by) REFERENCES accounts(account_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE installs
    ADD CONSTRAINT stc_submitted_by_fk FOREIGN KEY (stc_submitted_by) REFERENCES accounts(account_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE installs
    ADD CONSTRAINT stc_approved_by_fk FOREIGN KEY (stc_approved_by) REFERENCES accounts(account_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE installs
    ADD CONSTRAINT stc_form_fk FOREIGN KEY (stc_form) REFERENCES files(id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # install_logs
-- ############################################################################
ALTER TABLE install_logs
    ADD CONSTRAINT install_fk FOREIGN KEY (install_id) REFERENCES installs (install_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE install_logs
    ADD CONSTRAINT install_status_fk FOREIGN KEY (install_status_id) REFERENCES install_status (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # customer_logs
-- ############################################################################
ALTER TABLE customer_logs
    ADD CONSTRAINT customer_fk FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # events
-- ############################################################################
ALTER TABLE events
    ADD CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES accounts (account_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE events
    ADD CONSTRAINT roleBroadcast_fk FOREIGN KEY (rolebroadcast) REFERENCES roles (role_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # stock_item
-- ############################################################################
ALTER TABLE stock_item
    ADD CONSTRAINT type_fk FOREIGN KEY (type) REFERENCES stock_type (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # leads_stock_items
-- ############################################################################
ALTER TABLE leads_stock_items
    ADD CONSTRAINT lead_fk FOREIGN KEY (lead_id) REFERENCES leads (lead_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE leads_stock_items
    ADD CONSTRAINT item_fk FOREIGN KEY (item_id) REFERENCES stock_item (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # installs_stock_items
-- ############################################################################
ALTER TABLE installs_stock_items
    ADD CONSTRAINT install_fk FOREIGN KEY (install_id) REFERENCES installs (install_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE installs_stock_items
    ADD CONSTRAINT item_fk FOREIGN KEY (item_id) REFERENCES stock_item (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # lead_files
-- ############################################################################
ALTER TABLE lead_files
    ADD CONSTRAINT lead_fk FOREIGN KEY (lead_id) REFERENCES leads (lead_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE lead_files
    ADD CONSTRAINT file_fk FOREIGN KEY (file_id) REFERENCES files (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # lead_extras
-- ############################################################################
ALTER TABLE lead_extras
    ADD CONSTRAINT lead_fk FOREIGN KEY (lead_id) REFERENCES leads (lead_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # install_files
-- ############################################################################
ALTER TABLE install_files
    ADD CONSTRAINT install_fk FOREIGN KEY (install_id) REFERENCES installs (install_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE install_files
    ADD CONSTRAINT file_fk FOREIGN KEY (file_id) REFERENCES files (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # install_extras
-- ############################################################################
ALTER TABLE install_extras
    ADD CONSTRAINT install_fk FOREIGN KEY (install_id) REFERENCES installs (install_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # notifications
-- ############################################################################
ALTER TABLE notifications
    ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES accounts(account_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # services
-- ############################################################################
ALTER TABLE services
    ADD CONSTRAINT status_fk FOREIGN KEY (status_id) REFERENCES service_status (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE services
    ADD CONSTRAINT customer_fk FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE services
    ADD CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES accounts (account_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # service_items
-- ############################################################################
ALTER TABLE service_items
    ADD CONSTRAINT service_fk FOREIGN KEY (service_id) REFERENCES services (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # service_files
-- ############################################################################
ALTER TABLE service_files
    ADD CONSTRAINT service_fk FOREIGN KEY (service_id) REFERENCES services (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE service_files
    ADD CONSTRAINT file_fk FOREIGN KEY (file_id) REFERENCES files (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # installer_files
-- ############################################################################
ALTER TABLE installer_files
    ADD CONSTRAINT installer_fk FOREIGN KEY (installer_id) REFERENCES installers (installer_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE installer_files
    ADD CONSTRAINT file_fk FOREIGN KEY (file_id) REFERENCES files (id)
    ON UPDATE CASCADE ON DELETE CASCADE;