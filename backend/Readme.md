# Todo App (Go + Fiber)

Lightweight Todo application built with Go and the Fiber web framework. Includes JWT-based authentication (cookies), middleware for protected routes, MongoDB persistence, and basic CRUD for todos. This repo is a tutorial-style example.

**Quick Links**
- **App entry:** [server.go](server.go)
- **App setup:** [src/app.go](src/app.go)
- **DB connection:** [src/db/db.go](src/db/db.go)
- **Auth controller:** [src/controllers/auth.contoller.go](src/controllers/auth.contoller.go)
- **Todo controller:** [src/controllers/todo.controller.go](src/controllers/todo.controller.go)
- **Models:** [src/models/user.model.go](src/models/user.model.go), [src/models/todo.model.go](src/models/todo.model.go)
- **Routes:** [src/routes/auth.route.go](src/routes/auth.route.go), [src/routes/todo.route.go](src/routes/todo.route.go)
- **Middleware:** [src/middleware/auth.middleware.go](src/middleware/auth.middleware.go)

**Prerequisites**
- Go (1.18+ recommended)
- MongoDB (local or remote)

**Environment**
Create a `.env` file in the project root or set environment variables in your shell. Required variables:

- `MONGO_URI` — MongoDB connection URI (e.g. `mongodb://localhost:27017`)
- `DB_NAME` — Database name (e.g. `todo`)
- `JWT_SECRET` — Secret used for signing JWT tokens

Example (PowerShell):

```powershell
$env:MONGO_URI = "mongodb://localhost:27017"
$env:DB_NAME = "todo"
$env:JWT_SECRET = "replace_with_a_secret"
go run server.go
```

Or build then run:

```powershell
go build ./...
.
./todo_go.exe # on Windows the executable will be created; or use `go run server.go`
```

**API - Authentication**

- POST /auth/register — Register a new user
	- Body: `{ "email": "you@example.com", "password": "secret" }`
- POST /auth/login — Login and receive a `jwt` cookie
	- Body: `{ "email": "you@example.com", "password": "secret" }`
- POST /auth/logout — Protected route; clears the cookie

See the handlers in [src/controllers/auth.contoller.go](src/controllers/auth.contoller.go).

**API - Todos (protected)**

All `/todo` routes are protected by the `AuthMiddleware` which expects a valid `jwt` cookie. Routes are defined in [src/routes/todo.route.go](src/routes/todo.route.go).

- POST /todo/ — Create a todo
	- Body: `{ "title": "Buy milk", "description": "Get from store", "status": "incomplete" }`
	- `status` accepts `completed` or `incomplete` (see [src/models/todo.model.go](src/models/todo.model.go)). Defaults to `incomplete`.
- GET /todo/ — Get all todos for the authenticated user
- PUT /todo/:id — Update a todo by ID
- DELETE /todo/:id — Delete a todo by ID

**Middleware**

- `AuthMiddleware` (src/middleware/auth.middleware.go): reads the `jwt` cookie, validates the token, checks expiry, and sets `userId` in context locals for handlers to use.

**Data models**

- `User` (src/models/user.model.go): stores `ID`, `Email`, `Password` (hashed), and `Todos` (IDs)
- `Todo` (src/models/todo.model.go): stores `ID`, `Title`, `Description`, `Status`

**Notes & Next Steps**

- Passwords are hashed with bcrypt in the auth controller. Keep `JWT_SECRET` secure.
- Consider adding request validation, pagination for todos, and unit/integration tests.
- To inspect or change routes, see [src/routes](src/routes).
