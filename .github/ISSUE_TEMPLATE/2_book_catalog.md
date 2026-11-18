---
name: "2. Book Catalog Search & Pagination"
about: "Query-based filtering, search (title/author), and pagination on GET /books"
title: "feat(books): Query-based filtering, search, and pagination on GET /books"
labels: ["enhancement", "books"]
---

### Description
Provide flexible discovery capabilities on `GET /books` supporting genre filtering, text search across title and author, and pagination.

### Acceptance Criteria
- [x] `GET /books` reads `genreId`, `search`, `page`, and `limit` from `@Query()`.
- [x] Dynamic Prisma `where` clause with case-insensitive search across `title` and `author`.
- [x] Pagination applying `skip` and `take` based on `page` (default 1) and `limit` (default 10).
- [x] Include relational `genre` payload in query response.
