-- ############################################################################
-- # role_options
-- ############################################################################
INSERT INTO roles (role_name)
VALUES ('System Administrator'),
       ('General Manager'),
       ('Operations Manager'),
       ('Administration'),
       ('Warehouse'),
       ('Operations'),
       ('Services'),
       ('Accounts'),
       ('Sales'),
       ('Sales Manager');

-- ############################################################################
-- # users
-- ############################################################################
INSERT INTO users(username, email)
VALUES ('Admin', 'admin@spacesolar.com.au');

-- ############################################################################
-- # assigned_roles
-- ############################################################################
INSERT INTO assigned_roles(role_id, user_id)
VALUES ((SELECT id FROM roles WHERE role_name = 'System Administrator'),
        (SELECT id FROM users WHERE email = 'admin@spacesolar.com.au'));
