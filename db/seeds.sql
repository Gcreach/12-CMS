INSERT INTO department (department_name)
VALUES ('Management'),
('Developer'),
('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES ('Programmer', 100000, 2),
('Animator', 80000, 2),
('Lead Game Designer', 120000, 1),
('Marketing Advisor', 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Grant', 'Creach', 1, 1),
('Brad', 'Tyrell', 2, 1),
('John', 'Owen', 3, 1),
('Nick', 'B', 4, 2);