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
VALUES ('Admin', 'it@spacesolar.com.au');

-- ############################################################################
-- # assigned_roles
-- ############################################################################
INSERT INTO assigned_roles(role_id, user_id)
VALUES ((SELECT id FROM roles WHERE role_name = 'System Administrator'),
        (SELECT id FROM users WHERE email = 'it@spacesolar.com.au'));

-- ############################################################################
-- # lead_status
-- ############################################################################
INSERT INTO lead_status (status_name, colour)
VALUES ('New', '#3d4bb8'),
       ('Attempting Contact', '#f29c5e'),
       ('Park', '#616975'),
       ('Quotation', '#dbcb5e'),
       ('Win', '#37bd3b'),
       ('Review', '#0335fc'),
       ('Rejected', '#9b3fd1'),
       ('Lose', '#d42a47'),
       ('Rejected - Pending', '#9c1199'),
       ('Closed', '#822112');

-- ############################################################################
-- # phases
-- ############################################################################
INSERT INTO phases (option_name)
VALUES ('1'),
       ('2'),
       ('3');

-- ############################################################################
-- # existing_system
-- ############################################################################
INSERT INTO existing_system (option_name)
VALUES ('New'),
       ('Replace'),
       ('Additional');

-- ############################################################################
-- # stories
-- ############################################################################
INSERT INTO stories (option_name)
VALUES ('1'),
       ('2'),
       ('3+');

-- ############################################################################
-- # roof_types
-- ############################################################################
INSERT INTO roof_types (option_name)
VALUES ('Tile'),
       ('Tin'),
       ('Klip-Lok');

-- ############################################################################
-- # roof_pitch
-- ############################################################################
INSERT INTO roof_pitch (option_name)
VALUES ('Flat'),
       ('Pitched'),
       ('Steep (>30)');

-- ############################################################################
-- # stock_types
-- ############################################################################
INSERT INTO stock_types (option_name)
VALUES ('Panel'),
       ('Inverter'),
       ('Battery');

-- ############################################################################
-- # service_status
-- ############################################################################
INSERT INTO
    service_status (status_name, colour)
VALUES
       ('New', '#3d4bb8'),
       ('In Progress', '#9b3fd1'),
       ('Quotation', '#dedb3a'),
       ('Complete', '#37bd3b'),
       ('Closed', '#e00b0b');

-- ############################################################################
-- # install_status
-- ############################################################################
INSERT INTO
    install_status (status_name, colour)
VALUES
       ('Awaiting Deposit', '#3d4bb8'),
       ('PTC', '#dbcb5e'),
       ('Schedule', '#37bd3b'),
       ('Review', '#0335fc'),
       ('Awaiting Payment', '#9b3fd1'),
       ('Retailer Notification', '#d42a47'),
       ('STC', '#9c1199'),
       ('Complete', '#822112'),
       ('Cancelled', '#9c092e');