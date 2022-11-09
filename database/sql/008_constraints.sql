-- ############################################################################
-- # assigned_roles
-- ############################################################################
ALTER TABLE assigned_roles
    ADD CONSTRAINT role_fk FOREIGN KEY (role_id) REFERENCES roles (id)
        ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE assigned_roles
    ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users (id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # stock_item
-- ############################################################################
ALTER TABLE stock_item
    ADD CONSTRAINT stock_type_fk FOREIGN KEY (stock_type) REFERENCES stock_types (id)
        ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE stock_item
    ADD CONSTRAINT datasheet_fk FOREIGN KEY (datasheet) REFERENCES files (id)
        ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE stock_item
    ADD CONSTRAINT warranty_fk FOREIGN KEY (warranty) REFERENCES files (id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # customer_logs
-- ############################################################################
ALTER TABLE customer_logs
    ADD CONSTRAINT customer_fk FOREIGN KEY (customer_id) REFERENCES customers (id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # services
-- ############################################################################
ALTER TABLE services
    ADD CONSTRAINT customer_fk FOREIGN KEY (customer_id) REFERENCES customers (id)
        ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE services
    ADD CONSTRAINT status_fk FOREIGN KEY (status_id) REFERENCES service_status (id)
        ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE services
    ADD CONSTRAINT user_fk FOREIGN KEY (created_by) REFERENCES users (id)
        ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE services
    ADD CONSTRAINT state_fk FOREIGN KEY (state) REFERENCES states (id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # service_items
-- ############################################################################
ALTER TABLE service_items
    ADD CONSTRAINT service_fk FOREIGN KEY (service_id) REFERENCES services (id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- ############################################################################
-- # service_logs
-- ############################################################################
ALTER TABLE service_logs
    ADD CONSTRAINT service_fk FOREIGN KEY (service_id) REFERENCES services (id)
        ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE service_logs
    ADD CONSTRAINT status_fk FOREIGN KEY (service_status_id) REFERENCES service_status (id)
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