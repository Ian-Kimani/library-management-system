---
name: "4. Authentication & Password Hashing"
about: "Register and login endpoints issuing JWTs, with bcrypt password hashing"
title: "feat(auth): Register and login endpoints issuing JWTs with bcrypt password hashing"
labels: ["auth", "security"]
---

### Description
Build a secure authentication system featuring user registration, credential verification, and JWT generation with bcrypt hashing.

### Acceptance Criteria
- [x] `POST /auth/register` hashes passwords with bcrypt (salt factor 10) before saving.
- [x] Duplicate email registration prevention with `ConflictException`.
- [x] `POST /auth/login` verifies credentials via `bcrypt.compare` and issues signed JWT tokens.
- [x] Modular `AuthModule`, `AuthController`, and `AuthService`.
