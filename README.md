# 🚀 Project Management API

A RESTful API built using **NestJS**, **TypeScript (Strict Mode)**, and **Prisma ORM**.  
This project implements JWT authentication and relational data management between Users, Projects, and Tasks.

---

## 📌 Features

- 🔐 JWT Authentication (Register & Login)
- 🧱 Modular Architecture (Auth, Projects, Tasks)
- 🗄 Relational Database (User → Project → Task)
- 🛡 Route Protection using AuthGuard
- ✅ Input Validation using class-validator
- 🧪 End-to-End Testing (Jest + Supertest)
- 📄 API Documentation via Postman Collection

---

## 🏗 Architecture Pattern

This project uses **Modular Layered Architecture**:

Controller → Service → Prisma (Database)
### Why this pattern?

- Clear separation of concerns  
- Scalable structure  
- Maintainable codebase  
- Easy to test  
- Follows NestJS best practices  

Each module contains:

- Controller (HTTP layer)
- Service (Business logic)
- DTO (Validation layer)
- Prisma (Database interaction)

---

User
└── Projects
└── Tasks

## 🗄 Database Design


- One User can have many Projects
- One Project can have many Tasks

---

## 🔐 Authentication

- JWT-based authentication
- Password hashing using bcrypt
- Unique email constraint
- Proper HTTP status handling (400, 401, 409)

---

## 📄 API Documentation

API documentation is provided via **Postman Collection**.

The collection is organized into folders:

Auth

Register

Login

Projects

Create Project

Get Projects

Delete Project

Tasks

Create Task

Get Tasks by Project

Delete Task


To use:

1. Import the Postman collection from `/postman` folder
2. Set `base_url` in environment
3. Login to obtain JWT token
4. Use token in Authorization header (Bearer token)

---

## 🧪 Testing

E2E testing implemented using:

- Jest
- Supertest

Run E2E test:

```bash
npm run test:e2e

🛠 Tech Stack

NestJS

TypeScript (Strict Mode)

Prisma ORM

PostgreSQL / MySQL

JWT Authentication

class-validator

Jest (E2E Testing)

⚙️ Installation
npm install

🗄 Setup Database
npx prisma migrate dev

▶️ Run Application
npm run start:dev

Server runs at:
http://localhost:3000

📂 Project Structure
src/
  ├── auth/
  ├── projects/
  ├── tasks/
  ├── prisma/
  ├── common/

📌 Why This Project Matters

This project demonstrates:

Clean backend architecture

Secure authentication implementation

Relational database handling

Proper error handling

API documentation structuring

Automated testing

