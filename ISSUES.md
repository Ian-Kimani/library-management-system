# GitHub Issues & Task Tracking: Backend Core & Auth Milestone

This document tracks the issues and user stories implemented as part of the core backend and authentication system for the Library Management System.

---

### Issue #1: Genre Domain Model & Full CRUD Endpoints
- **Status**: Completed
- **Labels**: `enhancement`, `backend`, `catalog`
- **Description**: 
  Implement complete CRUD functionality for the literary Genre taxonomy to organize and classify the library's catalog.
- **Acceptance Criteria**:
  - [x] `POST /genres` creates a genre with unique name verification and `CreateGenreDto` validation.
  - [x] `GET /genres` retrieves all genres with associated book counts.
  - [x] `GET /genres/:id` retrieves single genre details including relational book list.
  - [x] `PATCH /genres/:id` updates genre name and description with `UpdateGenreDto`.
  - [x] `DELETE /genres/:id` removes genre by ID with 404 handling if not found.
  - [x] Structured NestJS module architecture (`genres.module.ts`, `genres.controller.ts`, `genres.service.ts`).

---

### Issue #2: Book Catalog Query-Based Filtering, Search & Pagination
- **Status**: Completed
- **Labels**: `enhancement`, `performance`, `books`
- **Description**:
  Provide flexible discovery capabilities on the book catalog endpoint (`GET /books`) supporting genre filtering, text search across title and author, and scalable pagination.
- **Acceptance Criteria**:
  - [x] `GET /books` reads `genreId`, `search`, `page`, and `limit` from `@Query()`.
  - [x] Dynamic Prisma `where` clause with case-insensitive search across `title` and `author`.
  - [x] Pagination applying `skip` and `take` based on requested `page` (default 1) and `limit` (default 10).
  - [x] Include relational `genre` payload in query response.
  - [x] Return paginated metadata (`total`, `page`, `limit`, `totalPages`).

---

### Issue #3: Strict DTO Validation on Book & Genre Endpoints
- **Status**: Completed
- **Labels**: `validation`, `security`
- **Description**:
  Ensure all client input is strictly validated before reaching business logic or database persistence layers using `class-validator` and `class-transformer`.
- **Acceptance Criteria**:
  - [x] `CreateBookDto` contains validation decorators on every field:
    - `title`: `@IsString()`, `@IsNotEmpty()`
    - `author`: `@IsString()`, `@IsNotEmpty()`
    - `isbn`: `@IsString()`, `@IsNotEmpty()`
    - `totalCopies`: `@IsInt()`, `@Min(1)`
    - `genreId`: `@IsString()`, `@IsNotEmpty()`
  - [x] `CreateGenreDto` and `UpdateGenreDto` validate required and optional fields.
  - [x] Global `ValidationPipe` with `{ whitelist: true, transform: true }` strips unwhitelisted properties.

---

### Issue #4: User Authentication & Bcrypt Password Hashing
- **Status**: Completed
- **Labels**: `security`, `auth`
- **Description**:
  Build a secure authentication system featuring user registration, credential verification, and JWT generation, protecting member passwords with salted bcrypt hashes.
- **Acceptance Criteria**:
  - [x] `POST /auth/register` creates new user with `bcrypt.hash(password, 10)` before database storage.
  - [x] Duplicate email registration prevention with `ConflictException`.
  - [x] `POST /auth/login` verifies credentials via `bcrypt.compare` and issues signed JWT tokens.
  - [x] Modular `AuthModule`, `AuthController`, and `AuthService`.

---

### Issue #5: JWT Strategy & Role-Based Access Control (RBAC)
- **Status**: Completed
- **Labels**: `security`, `rbac`, `authorization`
- **Description**:
  Protect catalog management operations so that only verified staff members with the `LIBRARIAN` role can create, modify, or delete books.
- **Acceptance Criteria**:
  - [x] `JwtStrategy` validates incoming Bearer tokens using `JWT_SECRET`.
  - [x] `JwtAuthGuard` extends NestJS `AuthGuard('jwt')`.
  - [x] Custom `@Roles()` decorator sets metadata for required user roles.
  - [x] `RolesGuard` extracts `req.user.role` and verifies against `@Roles()` metadata.
  - [x] `POST /books`, `PATCH /books/:id`, and `DELETE /books/:id` are guarded and restricted to `LIBRARIAN`.

---

### Issue #6 (Stretch): User Profile Endpoint & Login Route Rate Limiting
- **Status**: Completed
- **Labels**: `stretch-goal`, `security`, `profile`
- **Description**:
  Provide an authenticated user introspection endpoint and defend against brute-force attacks on the login route.
- **Acceptance Criteria**:
  - [x] `GET /users/profile` uses `@Req()` to retrieve the authenticated user payload.
  - [x] Rate limiting configured using `@nestjs/throttler` on the `POST /auth/login` route.

---

### Issue #7: Postman Collection & API Contract Documentation
- **Status**: Completed
- **Labels**: `documentation`, `qa`
- **Description**:
  Provide an end-to-end Postman collection covering all authentication, catalog, genre, and user endpoints.
- **Acceptance Criteria**:
  - [x] Collection saved at `docs/postman_collection.json` compliant with Postman v2.1.0 schema.
  - [x] Requests for all endpoints: Register, Login, Profile, Genre CRUD, Book CRUD + Query Filters.
  - [x] Pre-configured variables and token extraction test scripts.
