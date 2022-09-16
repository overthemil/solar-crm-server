-- ############################################################################
-- # assigned_roles
-- ############################################################################
ALTER TABLE assigned_roles
    ADD CONSTRAINT role_fk FOREIGN KEY (role_id) REFERENCES roles (id)
        ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE assigned_roles
    ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users (id)
        ON UPDATE CASCADE ON DELETE CASCADE;