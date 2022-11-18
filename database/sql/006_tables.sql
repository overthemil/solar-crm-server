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
    id          SERIAL PRIMARY KEY,
    status_name TEXT NOT NULL,
    colour      TEXT NOT NULL
);

-- ############################################################################
-- # Options - Installs
-- ############################################################################
CREATE TABLE install_status
(
    id          SERIAL PRIMARY KEY,
    status_name TEXT NOT NULL,
    colour      TEXT NOT NULL
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

-- ############################################################################
-- # Customers
-- ############################################################################
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
-- # States (As in address states - NSW, QLD)
-- ############################################################################
CREATE TABLE states
(
    id          UUID             DEFAULT gen_random_uuid() PRIMARY KEY,
    option_name TEXT    NOT NULL,
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    reference   TEXT    NOT NULL
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

-- ############################################################################
-- # Services
-- ############################################################################
CREATE TABLE services
(
    id              UUID                 DEFAULT gen_random_uuid() PRIMARY KEY,
    visit_scheduled BOOLEAN     NOT NULL DEFAULT FALSE,
    visit           timestamptz,
    paid            BOOLEAN     NOT NULL DEFAULT FALSE,
    customer_id     UUID        NOT NULL,
    street          TEXT        NOT NULL,
    suburb          TEXT        NOT NULL,
    state           UUID        NOT NULL,
    postcode        TEXT        NOT NULL,
    description     TEXT,
    status_id       INT         NOT NULL DEFAULT 1,
    created_by      UUID        NOT NULL,
    create_date     timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE service_status
(
    id          SERIAL PRIMARY KEY,
    status_name TEXT NOT NULL,
    colour      TEXT NOT NULL
);

CREATE TABLE service_items
(
    id          UUID             DEFAULT gen_random_uuid() PRIMARY KEY,
    description TEXT    NOT NULL,
    service_id  UUID    NOT NULL,
    price       NUMERIC NOT NUll DEFAULT 0
);

CREATE TABLE service_logs
(
    id                UUID                 DEFAULT gen_random_uuid() PRIMARY KEY,
    service_id        UUID        NOT NULL,
    msg               TEXT        NOT NULL,
    auto              BOOLEAN     NOT NULL DEFAULT TRUE,
    service_status_id INT         NOT NULL,
    created_by        TEXT        NOT NULL,
    create_date       timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE service_files
(
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_id UUID NOT NULL,
    file_id    UUID NOT NULL
);

-- ############################################################################
-- # Leads
-- ############################################################################
CREATE TABLE leads
(
    id                  UUID                 DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name          TEXT,
    last_name           TEXT,
    company_name        TEXT,
    company_abn         TEXT,
    street              TEXT        NOT NULL,
    suburb              TEXT        NOT NULL,
    state               UUID        NOT NULL,
    postcode            TEXT        NOT NULL,
    email               TEXT,
    phone               TEXT,
    description         TEXT,
    source_id           UUID,
    nmi                 TEXT,
    meter               TEXT,
    property_comment    TEXT,
    retailer            TEXT,
    reference           INT                  DEFAULT 0,
    system_size         NUMERIC     NOT NULL DEFAULT 0,
    selling_price       NUMERIC,
    base_price          NUMERIC,
    distributor         TEXT,
    phase_id            UUID,
    story_id            UUID,
    existing_system_id  UUID,
    roof_type_id        UUID,
    roof_pitch_id       UUID,
    created_by          UUID        NOT NULL,
    sales_id            UUID,
    panel_design        UUID,
    proposal            UUID,
    rebate_applied      BOOLEAN     NOT NULL DEFAULT FALSE,
    rebate_type         TEXT,
    rebate_expiry       timestamptz,
    rebate_attachment   UUID,
    finance_applied     BOOLEAN     NOT NULL DEFAULT FALSE,
    finance_amount      NUMERIC,
    finance_interest    NUMERIC,
    finance_terms       TEXT,
    finance_repayment   NUMERIC,
    finance_institution TEXT,
    finance_attachment  UUID,
    status_id           INT         NOT NULL DEFAULT 1,
    create_date         timestamptz NOT NULL DEFAULT current_timestamp,
    last_updated        timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE lead_logs
(
    id             UUID                 DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id        UUID        NOT NULL,
    msg            TEXT        NOT NULL,
    auto           BOOLEAN     NOT NULL DEFAULT TRUE,
    lead_status_id INT         NOT NULL,
    created_by     TEXT        NOT NULL,
    create_date    timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE leads_stock_items
(
    id      UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID NOT NULL,
    item_id UUID NOT NULL,
    amount  INT  DEFAULT 0
);

CREATE TABLE lead_extras
(
    id      UUID             DEFAULT gen_random_uuid() PRIMARY KEY,
    extra   TEXT    NOT NULL,
    lead_id UUID    NOT NULL,
    price   NUMERIC NOT NUll DEFAULT 0
);

-- ############################################################################
-- # Installers
-- ############################################################################
CREATE TABLE installers
(
    id            UUID             DEFAULT gen_random_uuid() PRIMARY KEY,
    accreditation TEXT    NOT NULL,
    licence       TEXT    NOT NULL,
    full_name     TEXT    NOT NULL,
    email         TEXT    NOT NULL,
    phone         TEXT    NOT NULL,
    expiry        timestamptz,
    address       TEXT,
    disabled      BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE installer_files
(
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    installer_id UUID NOT NULL,
    file_id      UUID NOT NULL
);

-- ############################################################################
-- # Installs
-- ############################################################################
CREATE TABLE installs
(
    id                        UUID                 DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id                   UUID,
    reference                 TEXT,
    deposit_paid              BOOL        NOT NULL DEFAULT FALSE,
    deposit_amount            NUMERIC,
    deposit_paid_date         timestamptz,
    invoice_paid              BOOL        NOT NULL DEFAULT FALSE,
    invoice_amount            NUMERIC,
    invoice_paid_date         timestamptz,
    ptc_form_sent             BOOL        NOT NULL DEFAULT FALSE,
    ptc_form_sent_date        timestamptz,
    ptc_approval_date         timestamptz,
    ptc_number                TEXT,
    ptc_condition             TEXT,
    ptc_exempted              BOOL        NOT NULL DEFAULT FALSE,
    ptc_approved              BOOL        NOT NULL DEFAULT FALSE,
    inspection_exempted       BOOL        NOT NULL DEFAULT FALSE,
    inspection_completed      BOOL        NOT NULL DEFAULT FALSE,
    inspection_booked         BOOL        NOT NULL DEFAULT FALSE,
    inspection_booked_date    timestamptz,
    inspection_completed_date timestamptz,
    inspection_name           TEXT,
    inspection_licence        TEXT,
    inspection_ces            TEXT,
    review_approved           BOOL        NOT NULL DEFAULT FALSE,
    review_approved_date      timestamptz,
    review_comment            TEXT,
    review_by                 UUID,
    retailer_notice_complete  BOOL        NOT NULL DEFAULT FALSE,
    retailer_notice_date      timestamptz,
    schedule                  timestamptz,
    schedule_end              timestamptz,
    install_scheduled         BOOL        NOT NULL DEFAULT FALSE,
    installer_id              UUID,
    customer_id               UUID        NOT NULL,
    street                    TEXT        NOT NULL,
    suburb                    TEXT        NOT NULL,
    state                     UUID        NOT NULL,
    postcode                  TEXT        NOT NULL,
    nmi                       TEXT,
    meter                     TEXT,
    property_comment          TEXT,
    retailer                  TEXT,
    distributor               TEXT,
    phase_id                  UUID,
    story_id                  UUID,
    roof_type_id              UUID,
    roof_pitch_id             UUID,
    existing_system_id        UUID,
    system_size               NUMERIC     NOT NULL DEFAULT 0,
    selling_price             NUMERIC,
    base_price                NUMERIC,
    panel_design              UUID,
    proposal                  UUID,
    rebate_applied            BOOLEAN     NOT NULL DEFAULT FALSE,
    rebate_type               TEXT,
    rebate_expiry             timestamptz,
    rebate_attachment         UUID,
    finance_applied           BOOLEAN     NOT NULL DEFAULT FALSE,
    finance_amount            NUMERIC,
    finance_interest          NUMERIC,
    finance_terms             TEXT,
    finance_repayment         NUMERIC,
    finance_institution       TEXT,
    finance_attachment        UUID,
    stc_submitted             BOOLEAN     NOT NULL DEFAULT FALSE,
    stc_submission_date       timestamptz,
    stc_submission_numbers    INT,
    stc_submitted_by          UUID,
    stc_submitted_through     TEXT,
    stc_approval_received     BOOLEAN     NOT NULL DEFAULT FALSE,
    stc_approval_date         timestamptz,
    stc_approved_numbers      INT,
    stc_approved_values       NUMERIC,
    stc_approved_by           UUID,
    stc_receipt_number        TEXT,
    stc_form                  UUID,
    stc_comment               TEXT,
    status_id                 INT         NOT NULL DEFAULT 1,
    created_by                UUID        NOT NULL,
    sales_id                  UUID        NOT NULL,
    create_date               timestamptz NOT NULL DEFAULT current_timestamp,
    last_updated              timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE reference_counts
(
    id          SERIAL PRIMARY KEY,
    description TEXT UNIQUE,
    count       INT NOT NULL DEFAULT 0
);

CREATE TABLE installs_stock_items
(
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    install_id UUID NOT NULL,
    item_id    UUID NOT NULL,
    amount     INT  DEFAULT 0
);