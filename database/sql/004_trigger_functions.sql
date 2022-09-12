CREATE OR REPLACE FUNCTION update_modified_column()
    RETURNS TRIGGER AS
$$
BEGIN
    IF row (NEW.*) IS DISTINCT FROM row (OLD.*) THEN
        NEW.last_updated = now();
        RETURN NEW;
    ELSE
        RETURN OLD;
    END IF;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION update_leads_when_log_added()
    RETURNS TRIGGER AS
$$
BEGIN
    UPDATE leads
        SET last_updated = now()
    WHERE lead_id=NEW.lead_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION update_installs_when_log_added()
    RETURNS TRIGGER AS
$$
BEGIN
    UPDATE installs
        SET last_updated = now()
    WHERE install_id=NEW.install_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION update_install_status()
    RETURNS TRIGGER AS
$$
BEGIN
    IF row (NEW.*) IS DISTINCT FROM row (OLD.*) THEN
        NEW.status_id = 1;
        IF NEW.deposit_paid THEN
            NEW.status_id = 2;
            IF NEW.ptc_approved OR NEW.ptc_exempted THEN
                NEW.status_id = 3;
                IF NEW.install_scheduled THEN
                    NEW.status_id = 4;
                     IF (NEW.inspection_exempted OR NEW.inspection_completed) AND NEW.review_approved THEN
                         NEW.status_id = 5;
                         IF NEW.invoice_paid THEN
                             NEW.status_id = 6;
                             IF NEW.retailer_notice_complete THEN
                                 NEW.status_id = 7;
                                 IF NEW.stc_approval_received THEN
                                     NEW.status_id = 8;
                                 END IF;
                             END IF;
                         END IF;
                     END IF;
                END IF;
            END IF;
        END IF;
        RETURN NEW;
    ELSE
        RETURN OLD;
    END IF;
END;
$$ language 'plpgsql';