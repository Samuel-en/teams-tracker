-- seeds for departments 
INSERT INTO department (name)
VALUES ("Human Resources"), ("Production Manager"), ("Engineering"), ("Research and Development");

-- seeds for roles 
INSERT INTO roleTable (title, salary, department_id)
VALUES ("Human Resources", "60000", "123"); ("Production Manager", "100000", "321"); 
("Engineer", "150000", "231"); ("Research and Development", "90000", "132" );

-- seeds for employees
INSERT INTO employeeTable (firsName, lastName, role_id, manager_id)
VALUES ("Thomas", "Endrias", "123", "1");("Lily", "Endrias", "321", "2");
("Samuel", "Endrias", "231", "3");("Saba", "Fessahaye", "132", "4");