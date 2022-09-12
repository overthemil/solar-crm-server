CREATE TRIGGER update_account_time BEFORE UPDATE ON accounts
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_lead_time BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_install_time BEFORE UPDATE ON installs
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_customer_time BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER modify_install_status BEFORE UPDATE ON installs
    FOR EACH ROW EXECUTE PROCEDURE update_install_status();

CREATE TRIGGER update_lead_on_log_add BEFORE INSERT ON lead_logs
    FOR EACH ROW EXECUTE PROCEDURE update_leads_when_log_added();

CREATE TRIGGER update_installs_on_log_add BEFORE INSERT ON install_logs
    FOR EACH ROW EXECUTE PROCEDURE update_installs_when_log_added();