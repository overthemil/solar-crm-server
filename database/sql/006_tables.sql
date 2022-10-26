-- ############################################################################
-- # User Management
-- ############################################################################
CREATE TABLE users
(
    id           UUID                 DEFAULT gen_random_uuid() PRIMARY KEY,
    username     TEXT        NOT NULL,
    email        TEXT        NOT NULL UNIQUE,
    phone        TEXT,
    pass         TEXT,
    active       BOOL        NOT NULL DEFAULT TRUE,
    create_date  timestamptz NOT NULL DEFAULT current_timestamp,
    last_updated timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE roles
(
    id        UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
    role_name TEXT NOT NULL,
    active    BOOL NOT NULL DEFAULT TRUE,
    ord       SERIAL
);

CREATE TABLE assigned_roles
(
    id      UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    role_id UUID NOT NULL,
    user_id UUID NOT NULL
);

-- ############################################################################
-- # Options - Leads
-- ############################################################################
CREATE TABLE lead_sources
(
    id          UUID                 DEFAULT gen_random_uuid() PRIMARY KEY,
    source_name TEXT        NOT NULL,
    reference   TEXT UNIQUE NOT NULL,
    count       INT                  DEFAULT 0,
    active      BOOLEAN     NOT NULL DEFAULT TRUE,
    ord         SERIAL
);

CREATE TABLE lead_status
(
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    status_name TEXT NOT NULL,
    colour      TEXT NOT NULL,
    ord         SERIAL
);

-- ############################################################################
-- # Options - Misc
-- ############################################################################
/*
    All of these tables have the same field name for ease of use.
    We use the active column in order to know if a Select drop down should
    display the row.
    The ord column keeps track of the order that the rows were inserted which
    can be used to order the resulting rows. This is needed because the ID
    is a UUID.
*/
CREATE TABLE phases
(
    id          UUID             DEFAULT gen_random_uuid() PRIMARY KEY,
    option_name TEXT    NOT NULL,
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    ord         SERIAL
);

CREATE TABLE stories
(
    id          UUID             DEFAULT gen_random_uuid() PRIMARY KEY,
    option_name TEXT    NOT NULL,
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    ord         SERIAL
);

CREATE TABLE existing_system
(
    id          UUID             DEFAULT gen_random_uuid() PRIMARY KEY,
    option_name TEXT    NOT NULL,
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    ord         SERIAL
);

CREATE TABLE roof_types
(
    id          UUID             DEFAULT gen_random_uuid() PRIMARY KEY,
    option_name TEXT    NOT NULL,
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    ord         SERIAL
);

CREATE TABLE roof_pitch
(
    id          UUID             DEFAULT gen_random_uuid() PRIMARY KEY,
    option_name TEXT    NOT NULL,
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    ord         SERIAL
);

CREATE TABLE stock_types
(
    id          UUID             DEFAULT gen_random_uuid() PRIMARY KEY,
    option_name TEXT    NOT NULL,
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    ord         SERIAL
);

CREATE TABLE customers
(
    id           UUID                 DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name   TEXT,
    last_name    TEXT,
    company_name TEXT,
    company_abn  TEXT,
    email        TEXT,
    phone        TEXT,
    create_date  timestamptz NOT NULL DEFAULT current_timestamp,
    last_updated timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE customer_logs
(
    id          UUID                 DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID        NOT NULL,
    msg         TEXT        NOT NULL,
    auto        BOOLEAN     NOT NULL DEFAULT TRUE,
    created_by  TEXT        NOT NULL,
    create_date timestamptz NOT NULL DEFAULT current_timestamp
);

-- ############################################################################
-- # Stock
-- ############################################################################
CREATE TABLE stock_item
(
    id         UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
    stock_type UUID NOT NULL,
    brand      TEXT,
    series     TEXT,
    model      TEXT NOT NULL,
    active     BOOLEAN DEFAULT TRUE,
    datasheet  UUID,
    warranty   UUID,
    count      INT     DEFAULT 0
);

-- ############################################################################
-- # Files
-- ############################################################################
CREATE TABLE files
(
    id          UUID                 DEFAULT gen_random_uuid() PRIMARY KEY,
    file_name   TEXT        NOT NULL,
    file_ext    TEXT        NOT NULL,
    file_path   TEXT        NOT NULL,
    pond_id     TEXT,
    create_date timestamptz NOT NULL DEFAULT current_timestamp
);