---
name: "6. Profile Endpoint & Rate Limiting (Stretch)"
about: "GET /users/profile using @Req() and rate-limit login route with @nestjs/throttler"
title: "feat(stretch): GET /users/profile with @Req() and login rate-limiting"
labels: ["stretch-goal", "security"]
---

### Description
Provide an authenticated user introspection endpoint and defend against brute-force attacks on the login route.

### Acceptance Criteria
- [x] `GET /users/profile` uses `@Req()` to retrieve the authenticated user payload.
- [x] Rate limiting configured using `@nestjs/throttler` on the `POST /auth/login` route.
