CREATE TABLE accounts
(
    account_id   UUID                 DEFAULT gen_random_uuid() PRIMARY KEY,
    name         TEXT        NOT NULL,
    email        TEXT        NOT NULL UNIQUE,
    phone        TEXT        NOT NULL,
    password     TEXT        NOT NULL,
    role_id      INT         NOT NULL,
    disabled     BOOL        NOT NULL DEFAULT FALSE,
    create_date  timestamptz NOT NULL DEFAULT current_timestamp,
    last_updated timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE roles
(
    role_id SERIAL PRIMARY KEY,
    name    TEXT NOT NULL
);

CREATE TABLE customers
(
    customer_id  SERIAL PRIMARY KEY,
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
    log_id      SERIAL PRIMARY KEY,
    customer_id INT         NOT NULL,
    content     TEXT        NOT NULL,
    action      BOOL        NOT NULL DEFAULT TRUE,
    created_by  TEXT        NOT NULL,
    create_date timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE lead_source
(
    id     SERIAL PRIMARY KEY,
    name   TEXT    NOT NULL,
    ref    TEXT    NOT NULL,
    count  INT              DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE phases
(
    id  SERIAL PRIMARY KEY,
    num INT NOT NULL
);

CREATE TABLE stories
(
    id  SERIAL PRIMARY KEY,
    num TEXT NOT NULL
);

CREATE TABLE existing_system
(
    id      SERIAL PRIMARY KEY,
    comment TEXT NOT NULL
);

CREATE TABLE roof_types
(
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE roof_pitch
(
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE installers
(
    installer_id  SERIAL PRIMARY KEY,
    accreditation TEXT    NOT NULL,
    licence       TEXT    NOT NULL,
    name          TEXT    NOT NULL,
    email         TEXT    NOT NULL,
    phone         TEXT    NOT NULL,
    state         TEXT,
    expiry        timestamptz,
    address       TEXT,
    disabled      BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE install_status
(
    id     SERIAL PRIMARY KEY,
    name   TEXT NOT NULL,
    colour TEXT NOT NULL
);

CREATE TABLE installs
(
    install_id                SERIAL PRIMARY KEY,
    lead_id                   INT,
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
    installer_id              INT,
    customer_id               INT         NOT NULL,
    address                   TEXT        NOT NULL,
    address_id                TEXT,
    nmi                       TEXT,
    meter                     TEXT,
    comment                   TEXT,
    retailer                  TEXT,
    distributor               TEXT,
    phase_id                  INT,
    story_id                  INT,
    roof_type_id              INT,
    roof_pitch_id             INT,
    existing_system_id        INT,
    system_size               NUMERIC     NOT NULL DEFAULT 0,
    selling_price             NUMERIC,
    base_price                NUMERIC,
    panel_design              UUID,
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

CREATE TABLE install_logs
(
    log_id            SERIAL PRIMARY KEY,
    install_id        INT         NOT NULL,
    content           TEXT        NOT NULL,
    install_status_id INT         NOT NULL,
    action            BOOL        NOT NULL DEFAULT TRUE,
    created_by        TEXT        NOT NULL,
    create_date       timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE lead_status
(
    id     SERIAL PRIMARY KEY,
    name   TEXT NOT NULL,
    colour TEXT NOT NULL
);

CREATE TABLE leads
(
    lead_id             SERIAL PRIMARY KEY,
    first_name          TEXT,
    last_name           TEXT,
    company_name        TEXT,
    company_abn         TEXT,
    address             TEXT,
    address_id          TEXT,
    email               TEXT,
    phone               TEXT,
    comment             TEXT,
    source_id           INT,
    nmi                 TEXT,
    meter               TEXT,
    property_comment    TEXT,
    retailer            TEXT,
    reference           INT                  DEFAULT 0,
    system_size         NUMERIC     NOT NULL DEFAULT 0,
    selling_price       NUMERIC,
    base_price          NUMERIC,
    distributor         TEXT,
    phase_id            INT,
    story_id            INT,
    existing_system_id  INT,
    roof_type_id        INT,
    roof_pitch_id       INT,
    created_by          UUID        NOT NULL,
    sales_id            UUID,
    panel_design        UUID,
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
    log_id         SERIAL PRIMARY KEY,
    lead_id        INT         NOT NULL,
    content        TEXT        NOT NULL,
    lead_status_id INT         NOT NULL,
    action         BOOL        NOT NULL DEFAULT TRUE,
    created_by     TEXT        NOT NULL,
    create_date    timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE stock_type
(
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE stock_item
(
    id        SERIAL PRIMARY KEY,
    type      INT  NOT NULL,
    brand     TEXT,
    series    TEXT,
    model     TEXT NOT NULL,
    active    BOOLEAN DEFAULT TRUE,
    datasheet UUID,
    warranty  UUID,
    count     INT     DEFAULT 0
);

CREATE TABLE leads_stock_items
(
    id      SERIAL PRIMARY KEY,
    lead_id INT NOT NULL,
    item_id INT NOT NULL,
    amount  INT DEFAULT 0
);

CREATE TABLE installs_stock_items
(
    id         SERIAL PRIMARY KEY,
    install_id INT NOT NULL,
    item_id    INT NOT NULL,
    amount     INT DEFAULT 0
);

CREATE TABLE events
(
    id            UUID                 DEFAULT gen_random_uuid() PRIMARY KEY,
    allDay        BOOLEAN     NOT NULL DEFAULT FALSE,
    title         TEXT        NOT NULL DEFAULT 'Event',
    description   TEXT        NOT NULL DEFAULT '',
    startDate     timestamptz NOT NULL DEFAULT current_timestamp,
    endDate       timestamptz NOT NULL DEFAULT current_timestamp,
    roleBroadcast INT,
    created_by    UUID        NOT NULL
);

CREATE TABLE files
(
    id          UUID                 DEFAULT gen_random_uuid() PRIMARY KEY,
    name        TEXT        NOT NULL,
    extension   TEXT        NOT NULL,
    path        TEXT        NOT NULL,
    pondID      TEXT        NOT NULL,
    create_date timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE file_types
(
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE lead_files
(
    id      SERIAL PRIMARY KEY,
    lead_id INT  NOT NULL,
    file_id UUID NOT NULL
);

CREATE TABLE lead_extras
(
    id      SERIAL PRIMARY KEY,
    name    TEXT    NOT NULL,
    lead_id INT     NOT NULL,
    price   NUMERIC NOT NUll DEFAULT 0
);

CREATE TABLE install_files
(
    id         SERIAL PRIMARY KEY,
    install_id INT  NOT NULL,
    file_id    UUID NOT NULL
);

CREATE TABLE install_extras
(
    id         SERIAL PRIMARY KEY,
    name       TEXT    NOT NULL,
    install_id INT     NOT NULL,
    price      NUMERIC NOT NUll DEFAULT 0
);

CREATE TABLE notifications
(
    id          UUID                 DEFAULT gen_random_uuid() PRIMARY KEY,
    icon        TEXT        NOT NULL,
    title       TEXT        NOT NULL,
    details     TEXT        NOT NULL,
    user_id     UUID        NOT NULL,
    href        TEXT,
    create_date timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE services
(
    id              SERIAL PRIMARY KEY,
    visit_scheduled BOOLEAN     NOT NULL DEFAULT FALSE,
    visit           timestamptz,
    paid            BOOLEAN     NOT NULL DEFAULT FALSE,
    customer_id     INT         NOT NULL,
    address         TEXT        NOT NULL,
    description     TEXT,
    status_id       INT         NOT NULL DEFAULT 1,
    created_by      UUID        NOT NULL,
    create_date     timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE service_status
(
    id     SERIAL PRIMARY KEY,
    name   TEXT NOT NULL,
    colour TEXT NOT NULL
);

CREATE TABLE service_items
(
    id          SERIAL PRIMARY KEY,
    description TEXT    NOT NULL,
    service_id  INT     NOT NULL,
    price       NUMERIC NOT NUll DEFAULT 0
);

CREATE TABLE service_logs
(
    log_id            SERIAL PRIMARY KEY,
    service_id        INT         NOT NULL,
    content           TEXT        NOT NULL,
    service_status_id INT         NOT NULL,
    action            BOOL        NOT NULL DEFAULT TRUE,
    created_by        TEXT        NOT NULL,
    create_date       timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE service_files
(
    id         SERIAL PRIMARY KEY,
    service_id INT  NOT NULL,
    file_id    UUID NOT NULL
);

CREATE TABLE installer_files
(
    id           SERIAL PRIMARY KEY,
    installer_id INT  NOT NULL,
    file_id      UUID NOT NULL
);

CREATE TABLE archive
(
    id           SERIAL PRIMARY KEY,
    internal_id  TEXT,
    first_name   TEXT,
    last_name    TEXT,
    phone        TEXT,
    email        TEXT,
    system_size  TEXT,
    inverter     TEXT,
    roof_type    TEXT,
    storey       TEXT,
    address      TEXT,
    install_date TEXT,
    task_id      TEXT
);

CREATE TABLE reference_counts
(
    id    SERIAL PRIMARY KEY,
    label TEXT,
    count INT NOT NULL DEFAULT 0
)