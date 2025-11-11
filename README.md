# Task API

A RESTful API for task management with user authentication.

## Features

- User registration and authentication
- JWT-based authentication
- CRUD operations for tasks
- Rate limiting
- Error handling
- MongoDB database
- Docker support

## Setup

### Local Development

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```env
MONGO_URI=mongodb://localhost:27017/taskdb
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
```

4. Start MongoDB (make sure it's running on your system)

5. Run the application:

```bash
npm run dev
```

### Docker Setup

1. Build and run with Docker Compose:

```bash
docker-compose up --build
```

This will start both the API server and MongoDB in containers.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile (requires auth)

### Tasks

- `POST /api/tasks` - Create a new task (requires auth)
- `GET /api/tasks` - Get all tasks for current user (requires auth)
- `PUT /api/tasks/:id` - Update a task (requires auth)
- `DELETE /api/tasks/:id` - Delete a task (requires auth)

## Usage Examples

### Register User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Task (with auth token)

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Complete project setup"}'
```

### Get Tasks

```bash
curl -X GET http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Technology Stack

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Express rate limiter
- Docker & Docker Compose
