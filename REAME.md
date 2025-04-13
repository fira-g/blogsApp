
## Project Title: Node.js Backend for Blogging Website

Welcome to the backend of a full featured Blogging Web App built using Node.js, Express
and MongoDB.
This API handles user authentication, blog post CRUD operations, profile management and  with clean code, modular structure and RESTful practices.

> 💻 Developed by: Senior Developer Firaol Gula
> 📅 Date: April 14, 2025

📂Project Structure
```
/project-root
│
├── src/
│   ├── config/         # DB connection & dotenv
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth, validation
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routers
│   ├── services/       # Token/email utilities
│   ├── app.js          # Main Express app
│
├── server.js           # Entry point
├── package.json
└── .env                # Environment variables
```
---

🧑‍💻Tech stack

| Tool / Library  |  Purpose |
| --- | --- |
| Node.js | JavaScript runtime |
| Express.js | Web server framework |
| MongoDB + Mongoose | NoSQL database & ODM |
| JWT |  Secure authentication |
| bcrypt | Password hashing |
| express-validator | Input validation |
| dotenv | Secure environment configs |
| Mailtrap SMTP | Password reset email testing |
| Google OAuth | Third-party login support  |

## 🧪 Features

### Authentication

- Register / Login / Logout
- JWT auth via cookies
- Password reset via email
- Google OAuth login

### Blog Posts

- Create, read, update, delete (CRUD)
- Posts are tied to authors
- Publicly accessible post viewing

### User Profile

- View / edit profile
- Secure access via JWT

### Comments

- Comment on posts
- View & delete comments (author-only)

---

## 🔐 Environment Setup

Create a `.env` file in your root directory with the following variables:

```
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority

# JWT & Session
JWT_SECRET=mySecrets
SESSION_SECRET=session_secret

# Mailtrap SMTP (for password reset)
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=587
MAILTRAP_USERNAME=your_username
MAILTRAP_PASSWORD=your_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

```

🛑 **Keep `.env` private — never commit to GitHub!**

---

## 🛠️ Installation & Running the Project

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blog-backend.git
cd blog-backend

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Configure Your `.env`

Fill in your Mongo URI, Mailtrap, and Google credentials as shown above.

### 4. Start the Dev Server

```bash
npm run dev

```

The server runs on `http://localhost:5000`.

---

## 📬 Postman API Testing

### 🧪 Step-by-Step:

1. Import the provided Postman Collection (included in repo)
2. Register a user → `/api/auth/register`
3. Log in → sets HTTP-only cookie
4. Access protected routes using the cookie
5. Test all flows: blog, profile, password reset, comments

> ⚠️ Protected routes require login. Postman will automatically use cookies if Send Cookies is enabled.
> 

---

## 🔄 API Endpoints Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in |
| POST | `/api/auth/logout` | Log out |
| POST | `/api/auth/reset-password/request` | Request reset email |
| PATCH | `/api/auth/reset-password/:token` | Reset password |
| POST | `/api/auth/google` | Google login |
| POST | `/api/posts` | Create post *(auth)* |
| GET | `/api/posts` | Get all posts *(public)* |
| PUT | `/api/posts/:id` | Update own post |
| DELETE | `/api/posts/:id` | Delete own post |
| GET | `/api/profile` | Get user profile |
| PUT | `/api/profile` | Update user profile |
| POST | `/api/comment/:postId` | Add comment *(auth)* |
| GET | `/api/comment/:postId` | Get comments |
| DELETE | `/api/comment/:commentId` | Delete comment *(auth)* |

---

## 📚 Why These Libraries?

| Library | Justification |
| --- | --- |
| `express` | Minimal and fast HTTP framework |
| `mongoose` | Simplifies MongoDB schema design |
| `bcrypt` | Encrypts passwords securely before DB storage |
| `jsonwebtoken` | Handles sessionless user authentication |
| `express-validator` | Ensures request data is safe and well-formed |
| `dotenv` | Keeps sensitive config out of codebase |
| `cookie-parser` | Parses JWT from HTTP-only cookies |
| `nodemailer` + `mailtrap` | Email testing for password reset flows |
| `passport-google-oauth20` | Adds easy third-party login |

---

## ✨ Features

- 🔐 Password hashing using bcrypt
- 📬 Reset password via email (Mailtrap)
- 🧠 Google Login integration
- 💬 Blog comments
- 🧹 Clean code structure for scalability
- 📦 Modular controllers & services

---


## 👨‍💻 Developer

> Mr. Firaol Gula – Senior Backend Developer
> 🗓️ April 2025

