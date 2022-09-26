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
    active    BOOL NOT NULL DEFAULT TRUE
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
    active      BOOLEAN     NOT NULL DEFAULT TRUE
);

CREATE TABLE lead_status
(
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    status_name TEXT NOT NULL,
    colour      TEXT NOT NULL
);