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
    id        SERIAL PRIMARY KEY,
    role_name TEXT NOT NULL,
    active    BOOL NOT NULL DEFAULT TRUE
);

CREATE TABLE assigned_roles
(
    id      SERIAL PRIMARY KEY,
    role_id INT  NOT NULL,
    user_id UUID NOT NULL
);
