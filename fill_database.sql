INSERT INTO activity(name, description, created_at) VALUES ('Nome atividade 01', 'Descricao Atividade 01', now());
INSERT INTO activity(name, description, created_at) VALUES ('Nome atividade 02', 'Descricao Atividade 02', now());

INSERT INTO course(name, code, created_at) VALUES  ('Nome curso 01', 'code001', now());
INSERT INTO course(name, code, created_at) VALUES  ('Nome curso 02', 'code002', now());

INSERT INTO "user"(password, last_login, name, email, is_admin, is_active, registration, created_at) VALUES
    ('pbkdf2_sha256$390000$8x3vzWawPLswQzemf9AG2s$sMmOZaNZYanBp5VOsCtcBY+NTg/PunUseF/Xrrhqlrs=',
     now(), admin, admin@admin.com, TRUE, FALSE, 0000000000, now());
INSERT INTO "user"(password, last_login, name, email, is_admin, is_active, registration, created_at) VALUES
    ('pbkdf2_sha256$390000$8x3vzWawPLswQzemf9AG2s$sMmOZaNZYanBp5VOsCtcBY+NTg/PunUseF/Xrrhqlrs=',
     now(), concat('nome ', md5(random()::text)), concat('email',md5(random()::text),'01@gmail.com'), FALSE, FALSE, md5(random()::text), now());

INSERT INTO "user"(password, last_login, name, email, is_admin, is_active, registration, created_at) VALUES
    ('pbkdf2_sha256$390000$8x3vzWawPLswQzemf9AG2s$sMmOZaNZYanBp5VOsCtcBY+NTg/PunUseF/Xrrhqlrs=',
     now(), concat('nome ', md5(random()::text)), concat('email',md5(random()::text),'02@gmail.com'), FALSE, FALSE, md5(random()::text), now());

INSERT INTO activity_course(maximum_hours, created_at, activity_id, course_id) VALUES (
    10, now(), 1, 1);
INSERT INTO activity_course(maximum_hours, created_at, activity_id, course_id) VALUES (
    20, now(), 2, 2);

INSERT INTO user_activity(quantity, hours_acc, total_hours, is_valid, created_at, activity_id, user_id) VALUES (
    10, 20, 30, FALSE, now(), 1, 1);
INSERT INTO user_activity(quantity, hours_acc, total_hours, is_valid, created_at, activity_id, user_id) VALUES (
    40, 50, 60, FALSE, now(), 2, 2);

INSERT INTO user_course(created_at, course_id, user_id) VALUES (
    now(), 1, 1);
INSERT INTO user_course(created_at, course_id, user_id) VALUES (
    now(), 2, 2);