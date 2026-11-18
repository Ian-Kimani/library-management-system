---
name: "1. Genre Domain Model & Full CRUD"
about: "Implement full CRUD endpoints for literary genre taxonomy"
title: "feat(genres): Implement Genre domain model and full CRUD endpoints"
labels: ["enhancement", "genres"]
---

### Description
Implement full CRUD functionality for the literary Genre taxonomy to classify the library's catalog.

### Acceptance Criteria
- [x] `POST /genres` creates a genre with unique name verification and `CreateGenreDto` validation.
- [x] `GET /genres` retrieves all genres with associated book counts.
- [x] `GET /genres/:id` retrieves single genre details including relational book list.
- [x] `PATCH /genres/:id` updates genre name and description with `UpdateGenreDto`.
- [x] `DELETE /genres/:id` removes genre by ID with 404 handling if not found.
