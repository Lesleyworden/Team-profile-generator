USE employee_db;

INSERT INTO departments (name) VALUES (
    'Front End'
);
INSERT INTO departments (name) VALUES (
    'Back End'
);
INSERT INTO departments (name) VALUES (
    'QA'
);


INSERT INTO roles (title, salary, department_id) VALUES (
    'Front End Developer',
    70000,
    1
);
INSERT INTO roles (title, salary, department_id) VALUES (
    'Back End Developer',
    80000,
    2
);
INSERT INTO roles (title, salary, department_id) VALUES (
    'QA Specialist',
    50000,
    3
);
INSERT INTO roles (title, salary, department_id) VALUES (
    'General Manager',
    90000,
    3
);

INSERT INTO employees (firstname, lastname, role_id, manager_id) VALUES (
    'John',
    'Doe',
    1,
    NULL
);

INSERT INTO employees (firstname, lastname, role_id, manager_id) VALUES (
    'Jane',
    'Johnson',
    2,
    NULL
);

INSERT INTO employees (firstname, lastname, role_id, manager_id) VALUES (
    'Tim',
    'Smith',
    3,
    4
);