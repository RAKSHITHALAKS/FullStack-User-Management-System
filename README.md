# User Management System

## Overview

A Full Stack User Management System built using React, FastAPI, and MySQL. The application provides secure user registration, login authentication, profile management, and dashboard functionality with a clean and responsive user interface.

## Features

* User Registration
* User Login Authentication
* Password Hashing using bcrypt
* JWT Token Generation
* User Profile Management
* Protected Routes
* Dashboard View
* Member Since Information
* Responsive UI
* MySQL Database Integration
* RESTful API Architecture

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Vite
* CSS3

### Backend

* FastAPI
* SQLAlchemy ORM
* Pydantic
* Uvicorn

### Database

* MySQL

### Authentication

* JWT (JSON Web Token)
* bcrypt Password Hashing

---

## Project Structure

UserManagementSystem/

├── backend/

│ ├── main.py

│ ├── models.py

│ ├── database.py

│ ├── auth.py

│ ├── schemas.py

│ ├── login_schema.py

│ └── requirements.txt

│

├── frontend/

│ ├── src/

│ ├── package.json

│ └── vite.config.js

│

└── README.md

---

## Installation

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend Server:

```text
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend Server:

```text
http://localhost:5173
```

---

## API Endpoints

### Signup

```http
POST /signup
```

Request:

```json
{
  "name": "Rakshitha",
  "email": "rakshitha@gmail.com",
  "password": "123456"
}
```

---

### Login

```http
POST /login
```

Request:

```json
{
  "email": "rakshitha@gmail.com",
  "password": "123456"
}
```

---

### Profile

```http
GET /profile/{email}
```

---

## Database Schema

### Users Table

| Field        | Type    |
| ------------ | ------- |
| id           | Integer |
| name         | String  |
| email        | String  |
| password     | String  |
| member_since | String  |

---

## Security Features

* Password Hashing using bcrypt
* JWT-based Authentication
* Protected Frontend Routes
* Input Validation
* Error Handling

---

## Future Enhancements

* Password Reset Functionality
* Email Verification
* User Roles and Permissions
* Admin Dashboard
* Account Deactivation
* Profile Image Upload

---

## Author

Rakshitha C
RV Institute of Technology and Management
Bangalore, India
