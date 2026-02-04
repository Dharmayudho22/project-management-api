Project Management API
A RESTful API built using NestJS, TypeScript (Strict Mode), and Prisma ORM.
This project implements JWT authentication and relational data management between Users, Projects, and Tasks.

📌 Features
JWT Authentication (Register & Login)

Modular Architecture (Auth, Projects, Tasks)

Relational Database (User → Project → Task)

Route Protection using AuthGuard

Input Validation using class-validator

End-to-End Testing (Jest + Supertest)

API Documentation via Postman Collection

Architecture Pattern
This project uses Modular Layered Architecture:
Controller → Service → Prisma (Database)

Why this pattern?
Clear separation of concerns
Scalable structure
Maintainable codebase
Easy to test
Follows NestJS best practices

Each module contains:
Controller (HTTP layer)
Service (Business logic)
DTO (Validation layer)
Prisma (Database interaction)

Database Design
Relational structure:
User
 └── Projects
       └── Tasks
One User can have many Projects
One Project can have many Tasks

Authentication
JWT-based authentication
Password hashing with bcrypt
Unique email constraint
Proper HTTP status handling (400, 401, 409)

API Documentation
API documentation is provided via Postman Collection.
The collection is organized into folders:

Auth
  - Register
  - Login

Projects
  - Create Project
  - Get Projects
  - Delete Project

Tasks
  - Create Task
  - Get Tasks by Project
  - Delete Task

To use:
Import the file from /postman folder
Set base_url in environment
Login and set token
Use protected routes

Testing
E2E testing implemented using:
Jest
Supertest

Test scenarios:
Register user
Login user
Unauthorized access handling
Create project
Create task

Run tests:
npm run test:e2e

Tech Stack
NestJS
TypeScript (Strict Mode)
Prisma ORM
PostgreSQL / MySQL
JWT
class-validator
Jest

Installation
npm install

Setup Database
npx prisma migrate dev

Run Application
npm run start:dev

Server runs at:
http://localhost:3000

Project Structure
src/
  ├── auth/
  ├── projects/
  ├── tasks/
  ├── prisma/
  ├── common/


Why This Project Matters

This project demonstrates:
Clean backend architecture
Secure authentication implementation
Relational database handling
Proper error handling
API documentation structuring
Automated testing