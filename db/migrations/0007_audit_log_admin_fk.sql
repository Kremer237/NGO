-- audit_log.admin_user_id had no foreign key when the table was created
-- (0004_audit_log.sql) because admin_users didn't exist yet. Add it now.

alter table audit_log
  add constraint audit_log_admin_user_id_fkey
  foreign key (admin_user_id) references admin_users (id);
