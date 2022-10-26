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
