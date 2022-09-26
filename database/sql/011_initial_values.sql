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

-- ############################################################################
-- # lead_status
-- ############################################################################
INSERT INTO
    lead_status (status_name, colour)
VALUES
       ('New', '#3d4bb8'),
       ('Attempting Contact', '#f29c5e'),
       ('Park', '#616975'),
       ('Quotation', '#dbcb5e'),
       ('Win', '#37bd3b'),
       ('Review', '#0335fc'),
       ('Rejected', '#9b3fd1'),
       ('Lose', '#d42a47'),
       ('Rejected - Pending', '#9c1199'),
       ('Closed', '#822112');