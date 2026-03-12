user Route can:
- Get all Users | Admin User | GET /api/v1/user 
- Get user by param id | Admin user | GET /api/v1/user/:id
- Sign up a user | Anyone | POST /api/v1/user/signup | return JWT   TOKEN
- Log in a user | Any existing user | POST /api/v1/user/login | return JWT   TOKEN
- Send email with url to reset password | Any existing user | POST /api/v1/user/forgotPassword
- Reset password | Any existing user | PATCH /api/v1/user/resetPassword/:token
- Change user password | Any logged in user | PATCH /api/v1/user/changePassword | return new JWT token
- Edit any user | Admin user | PATCH /api/v1/user/:id
TODO missing delete user

applications Route can:
- Get all applications from all users | Admin user | GET /api/v1/applications
- Filter applications from all users | Admin user | GET /api/v1/applications/filter
- Get any application from id param | Admin user | GET /api/v1/applications/:id
- Edit any application from id param | Admin user | PATCH /api/v1/applications/:id
- Delete any application from id param | Admin user | DELETE /api/v1/applications/:id

me Route can:
- Get the user | Any logged in user | GET /api/v1/me
- Edit the user | Any logged in user | PATCH /api/v1/me
- Get user applications | Any logged in user | GET /api/v1/me/applications
- Filter user applications | Any logged in user | GET /api/v1/me/applications/filter
- Add an application | Any logged in user | POST /api/v1/me/applications
- Edit user application by param id | Any logged in user | PATCH /api/v1/me/applications/:id
- Delete user application by param id | Any logged in user | DELETE /api/v1/me/applications/:id


# Job Applications API

REST API for managing **users and job applications**.

Built with:

- Node.js
- Express.js
- PostgreSQL / Supabase
- JWT Authentication
- REST API architecture

---

# Base URL

/api/v1

Example:
http://localhost:3000/api/v1

---

# Authentication

Most routes require a **JWT Bearer Token**.

Example header:
Authorization: Bearer <token>

JWT tokens are returned when a user:
- Signs up
- Logs in
- Changes password
- Resets password

---

# Auth Routes

| Method | Endpoint | Access | Description |
|------|------|------|------|
| POST | `/user/signup` | Public | Register a new user |
| POST | `/user/login` | Public | Login user |
| POST | `/user/forgotPassword` | Public | Send reset password email |
| PATCH | `/user/resetPassword/:token` | Public | Reset password using token |
| PATCH | `/user/changePassword` | Authenticated | Change user password |

---

# Users (Admin Only)

| Method | Endpoint | Access | Description |
|------|------|------|------|
| GET | `/users` | Admin | Get all users |
| GET | `/users/:id` | Admin | Get user by id |
| PATCH | `/users/:id` | Admin | Update user |
| DELETE | `/users/:id` | Admin | Delete user |

---

# Current User (`/me`)

Routes related to the **authenticated user**.

| Method | Endpoint | Access | Description |
|------|------|------|------|
| GET | `/me` | Authenticated | Get current user |
| PATCH | `/me` | Authenticated | Update current user |

---

# User Applications

Manage **applications belonging to the authenticated user**.

| Method | Endpoint | Access | Description |
|------|------|------|------|
| GET | `/me/applications` | Authenticated | Get user applications |
| GET | `/me/applications/:id` | Authenticated | Get specific application |
| POST | `/me/applications` | Authenticated | Create application |
| PATCH | `/me/applications/:id` | Authenticated | Update application |
| DELETE | `/me/applications/:id` | Authenticated | Delete application |

---

# Admin Applications Routes

Admin can manage **applications from all users**.

| Method | Endpoint | Access | Description |
|------|------|------|------|
| GET | `/applications` | Admin | Get all applications |
| GET | `/applications/:id` | Admin | Get application by id |
| PATCH | `/applications/:id` | Admin | Update application |
| DELETE | `/applications/:id` | Admin | Delete application |

---

# Filtering & Query Parameters

Applications endpoints support filtering via **query parameters**.

Example:
GET /api/v1/me/applications?status=interview