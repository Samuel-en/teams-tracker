-- sql tables 

drop database if exists employeeTracker_db;

create database employeeTracker_db;

use employeeTracker_db;

create table employeeTable 
(
id integer auto_increment primary key,
first_name varchar(50) not null,
last_name  varchar(50) not null,
role_id int not null default(-1),
manager_id int not null default(-1)
);

create table roleTable 
(
id integer auto_increment primary key,
title varchar(50) not null,
salary decimal not null,
department_id int not null
);

create table departmentTable
(
id int auto_increment primary key,
name varchar(50) not null
);

/* test values */

SELECT * FROM roleTable;
SELECT * FROM employeeTable;
SELECT * FROM departmentTable;

INSERT INTO roleTable (title, salary, department_id)
VALUES ("CEO", "150000", "123");

INSERT INTO employeeTable (firsName, lastName, role_id, manager_id)
VALUES ("Thomas", "Endrias", "321", "321");

INSERT INTO departmentTable (name)
VALUES ("Samuel Endrias");


