---
name: "3. DTO Validation"
about: "Strict class-validator decorators on all Book and Genre DTOs"
title: "feat(validation): DTO validation on all Book/Genre create and update endpoints"
labels: ["validation", "security"]
---

### Description
Ensure all client input is strictly validated before reaching business logic or database persistence layers.

### Acceptance Criteria
- [x] `CreateBookDto` contains validation decorators on every field (title, author, isbn, totalCopies, genreId).
- [x] `UpdateBookDto` validates optional fields and numbers.
- [x] `CreateGenreDto` and `UpdateGenreDto` validate required and optional fields.
- [x] Global `ValidationPipe` with `{ whitelist: true, transform: true }` enabled in `main.ts`.
