INSERT INTO activities (name, description, type, hours_added)
VALUES ('Trabalho Voluntário',
        'Atividade profissional remunerada ou não, incluindo estágio e emprego (exceto estágio obrigatório)',
        'ATIVIDADES COMPLEMENTARES EXTERNAS', 40);

INSERT INTO courses (name, code)
VALUES ('Eng. Soft.', 'CODEUVASS123');

INSERT INTO users (name, course_id, password, email)
VALUES ('Gabriel', 1, 'U2VuaGExMjNA', 'gabrielsoares221@gmail.com');

INSERT INTO users_activities (user_id, activity_id, quantity, total_hours)
VALUES (1, 1);
