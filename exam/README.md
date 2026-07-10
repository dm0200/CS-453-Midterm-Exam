# Midterm Exam — Middleware

This exam shows Express API is used for a Course Task Tracker using an in-memory array, **not** a database.

The example demonstrates:

- return appropriate status codes
- auto ID generation
- validation for missing fields
- app-level request logging
- in-memory array data handling
- global error handling

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

The server runs on:

```text
http://localhost:3000
```

## Try it

Health check:

```bash
curl http://localhost:3000/health
```

Get all tasks:

```bash
curl http://localhost:3000/api/tasks
```

Get one task:

```bash
curl http://localhost:3000/api/tasks/1
```

Create task:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Watch Week 1 lecture\",\"course\":\"CS453\"}"
```

Replace task:

```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Updated title\",\"course\":\"CS453\",\"completed\":true}"
```

Partial update:

```bash
curl -X PATCH http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d "{\"completed\":true}"
```

Delete task:

```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```


## Main lesson

Middleware is useful for behavior that should happen around routes rather than
inside every route handler. Keeping distinct layers separate can avoid confusion 
and strengthen logic to reduce errors at a global level since it can be also be 
beneficial at the visual level with patterns. 

Examples include logging, authentication, authorization, validation, and error
handling.
