---
name: "5. RBAC & RolesGuard"
about: "RolesGuard restricting book create/update/delete routes to LIBRARIAN accounts"
title: "feat(rbac): RolesGuard restricting book mutation routes to LIBRARIAN role"
labels: ["rbac", "security"]
---

### Description
Protect catalog management operations so that only verified staff members with the `LIBRARIAN` role can create, modify, or delete books.

### Acceptance Criteria
- [x] `JwtStrategy` validates Bearer tokens using `JWT_SECRET`.
- [x] `JwtAuthGuard` extends NestJS `AuthGuard('jwt')`.
- [x] Custom `@Roles()` decorator sets metadata for required user roles.
- [x] `RolesGuard` extracts `req.user.role` and verifies against `@Roles()` metadata.
- [x] `POST /books`, `PATCH /books/:id`, and `DELETE /books/:id` are guarded and restricted to `LIBRARIAN`.
