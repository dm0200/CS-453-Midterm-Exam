# CS-453 Midterm Exam

# answers.md

## Part 1 — Conceptual Foundations

**20 points**
Answer each question in answers.md. Use complete sentences, but do not write a novel.

## 1. Sockets vs. HTTP

Explain the difference between a raw TCP socket server and an HTTP server. Your answer should include:
what a socket provides,
what HTTP adds on top,
why most web APIs do not directly expose raw socket protocols.
**5 points**

```
The difference between a raw TCP socket server and an HTTP server is that an HTTP server essentially powers the web & 
gives structure to network messages whereas a raw TCP socket is flexible since it is like a foundation of network 
communication but has no structure. A socket provides the low-level foundation for many protocols & is an endpoint for 
network communication. Http is built on top of TCP which allows for define structure and patterns like status codes, 
methods (GET, POST, PUT, PATCH, DELETE), headers, etc. Most web APIs do not directly expose raw socket protocols because
it lacks standard format since a custom format would be required, can be difficult to use if you are unfamiliar with the
custom protocol, and possibly security risks without patterns.
```

### 2. Request/Response

Describe the request/response pattern. Then explain how it appears in:
a TCP command server,
an HTTP API,
an Express route handler.
**5 points**

```
The request/response pattern occurs in client and server communication where the client sends a request, the server 
processes the request & the server sends a response. The server waits until a request arrives. It appears in a TCP 
command server where the client's request is in the form of a raw text command then the server's response is sent back 
while the client can continue to send commands because the connection stays open. Client and server communication also 
appears in an HTTP API where the client's request is in the form of a structured and standardized pattern with a 
request line that has a method and a path, headers, and optional body then the server's response is sent back with a 
status line that includes a status code, headers, and a JSON body. Each response and request is independent meaning the 
connection closes after. Finally, client and server communication also appears in an Express route handler where the 
client's request is in the form of a "req" object with a method, path, headers & body then the server's response is 
sent back using the "res" object (example: res.json()). The client and server have separate responsibilities & each 
route handler maps one URL pattern to one function.
```

### 3. Statelessness

Explain what it means for an API to be stateless. Give one advantage and one disadvantage of stateless design.
**5 points**

```
For an API to be stateless, this means the server does not remember data about prior requests so each request must 
contain needed context. One advantage for the stateless design is it is easier to scale horizontally because there are 
no issues when needing to sync session data across a massive server cluster & one disadvantage of stateless design is 
the overhead it can cause since the client is forced to send all context with every request so this introduces 
increased data usage and network overhead.
```

### 4. HTTP Status Codes

For each situation, choose an appropriate HTTP status code and briefly justify it.

```
Situation                                         Status Code
A new resource was successfully created           201 - Used for "created" instances like when there is a successful 
                                                        request & a new resource is created as a result.
The client requested an item that does not exist  404 - Used for "not found" instances like when the server cannot 
                                                        find a resource or path requested.
The client sent JSON missing a required field     400 - Used for "bad request" instances like when there is an error 
                                                        on the client side & the server is unable to process the 
                                                        request due to the missing or invalid data.
The server had an unexpected error                500 - Used for "internal server error" instances like a generic 
                                                        "catch all" status code where there is an error on the server
                                                        side & is unable to fulfill the request.
A successful request returns JSON data            200 - Used for "ok" instances like when the HTTP request was 
                                                        successful & returned to the client.
```

**5 points**


## Part 2 — API Design

**15 points**
You are designing an API for a small **Course Task Tracker**. The API manages tasks for a class.
Each task has:

Design a REST-style API for this resource.

```
{
"id": "1",
"title": "Watch Week 3 lecture",
"course": "CS453",
"completed": false
}
```

```
Method Route Behavior
GET /health returns a simple health message
GET /api/tasks returns all tasks
GET /api/tasks/:id returns one task or 404
```
In answers.md, provide:

### 1. Resource URIs

List URIs for:
```
1. Getting all tasks - /tasks
2. Getting one task by id - /tasks/:id 
3. Creating a task - /tasks
4. Replacing a task - /tasks/:id
5. Partially updating a task - /tasks/:id
6. Deleting a task - /tasks/:id
```
**6 points**

### 2. Method Semantics

For each route, identify the HTTP method and explain whether it is:
safe,
idempotent,
neither.
**6 points**

```
1. Getting all tasks - (/tasks) -> GET, Safe & Idempotent because it does not change server state & request can be 
                                        repeated to get the same final state
2. Getting one task by id - (/tasks/:id) -> GET, Safe & Idempotent because it does not change server state & request 
                                                 can be repeated to get the same final state
3. Creating a task - (/tasks) -> POST, Neither because it does modify data to create the task & request can be repeated 
                                       to get a different final state since there is a new task
4. Replacing a task - (/tasks/:id) -> PUT, Idempotent because it does modify data since a task is replaced which can 
                                           be the same task & request can be repeated to get the same final state if 
                                           it is the same task
5. Partially updating a task - (/tasks/:id) -> PATCH, Neither because it does modify data with new data & request can 
                                                      be repeated to get a different final state since the task has 
                                                      changed
6. Deleting a task - (/tasks/:id) -> DELETE, Idempotent because it does modify data with removal of data & request can 
                                             be repeated to get the same final state if there was no data to begin 
                                             with & no data was removed
```

### 3. JSON Representation

Provide one valid JSON example for creating a new task.
**3 points**

```
{
"title": "Watch Week 3 lecture",
"course": "CS453",
"completed": false
}
```

## Part 3 — Express API Implementation

**30 points**

Implement an Express API for the Course Task Tracker.

Use an in-memory array. Do **not** use a database.

Your server must support these routes:


```
Method               Route                   Behavior
GET                  /health                 returns a simple health message
GET                  /api/tasks              returns all tasks 
GET                  /api/tasks/:id          returns one task or 404
POST                 /api/tasks              creates a new task
PUT                  /api/tasks/:id          replaces an existing task
PATCH                /api/tasks/:id          updates part of an existing task
DELETE               /api/tasks/:id          deletes a task
```

Requirements:

Use JSON request and response bodies.

Generate or assign ids.

Return appropriate status codes.

Validate required fields for POST.

Return 400 for bad input.

Return 404 for missing tasks.

Use 204 No Content or a reasonable JSON response for successful deletes.

Keep the code readable and organized.


**Suggested structure:**

```
src/ 
   server.js 
   routes/ 
      tasks.js 
   middleware/ 
      logger.js 
      errorHandler.js
```

**30 points**

```
************ TO DO ************
// server.js initializes Express, attaches the middleware, mapping the routing & handles healthpoint
// src/server.js

// tasks.js handles data stored array, IDs, field validation, and individual routes behaviors.
// src/routes/tasks.js

// src/middleware/logger.js

// src/middleware/errorHandler.js

// package.json

************ COMPLETE ************

```

## Part 4 — Middleware

**10 points**
Implement at least two pieces of middleware.
Required:

1. A request logger that records:
   HTTP method,
   path,
   response status,
   time taken.
2. A validation middleware for creating or updating tasks.

```
src/ 
   server.js 
   routes/ 
      tasks.js 
   middleware/ 
      logger.js 
      errorHandler.js
```

In answers.md, briefly explain why these are middleware concerns instead of being repeated manually inside
every route.
**10 points**

```
src/ 
   server.js 
   routes/ 
      tasks.js 
   middleware/ 
      logger.js 
      errorHandler.js
      validateTask.js

************ TO DO ************
// server.js initializes Express, attaches the middleware, mapping the routing & handles healthpoint
// src/server.js

// tasks.js handles data stored array, IDs, field validation, and individual routes behaviors.
// src/routes/tasks.js

// validateTask.js is a validation middleware for creating or updating tasks.
// src/middleware/validateTask.js

/* logger.js is a request logger that records:
    HTTP method,
    path,
    response status,
    time taken.
*/
// src/middleware/logger.js

// errorHandler.js catches global level errors
// src/middleware/errorHandler.js

// package.json

************ COMPLETE ************

Without middleware, manual repetition inside every route would be required. This 
allows for one change or edit to happen in one locatino rather than chaning it in every route. Middleware is also 
beneficial when spreading out the responisibilities of different logics/codes to avoid mixing unecesarry logics.

```

## Part 5 — Basic Client

**10 points**
Write a small client program that calls your API.
This can be a Node script using fetch.
The client should demonstrate:

1. calling /health,
2. creating a task,
3. listing all tasks,
4. getting one task by id,
5. updating a task,
6. deleting a task.
   The client does not need a GUI. Console output is fine.
   Example:

**10 points**

## Part 6 — OpenAPI Specification

**15 points**
Create an openapi.yaml file documenting your API.
It must include:
OpenAPI version,
API title and version,
server URL,
paths for all required routes,
path parameter for :id,
request body schemas for POST, PUT, and PATCH,
response schemas,
common error responses such as 400 and 404 ,
a reusable Task schema under components.schemas.

```
node client.js
```

**15 points**

## Part 7 — Reflection

**10 points**
In answers.md, answer the following:

### 1. Code vs. Contract

Explain the difference between an Express route implementation and an OpenAPI specification.
**4 points**

### 2. Drift

Give two examples of how code and OpenAPI documentation can drift apart.
**3 points**

### 3. Client Impact

Explain why inaccurate API documentation can cause problems for client developers.
**3 points**


