# Product Requirements Document (PRD): Boss Machine API

## 1. Project Overview

The Boss Machine is a full-stack application. The objective is to build a robust Express.js API to serve the provided React front-end. The API will manage resources for a boss: Minions, Million Dollar Ideas, Meetings, and Work (Bonus).

## 2. Setup & Installation

- **Dependencies:** Run `npm install` to install backend and frontend dependencies.
- **Development Server:** Run `npm run start` to start the Node server (auto-restarts on file changes).
- **Client:** Open `index.html` in Chrome (v60+) or Firefox (v55+).

## 3. Server Configuration (`app.js` & `main.js`)

- **Middleware (`app.js`):**
  - Set up `body-parser` for JSON body parsing.
  - Set up `cors` (default settings) to allow cross-origin requests.
- **Routing:** Mount the existing `apiRouter` at `/api`.
- **Server Initialization (`main.js`):** Start the Express server listening on the provided `PORT` constant.

## 4. API Routes (in `server/`)

_Requests for POST/PUT (except meetings) will contain new/updated resource data in the request body. POST bodies will omit the `id` property._

### 4.1 Minions (`/api/minions`)

- `GET /api/minions`: Get an array of all minions.
- `POST /api/minions`: Create a new minion and save it to the DB.
- `GET /api/minions/:minionId`: Get a single minion by ID.
- `PUT /api/minions/:minionId`: Update a single minion by ID.
- `DELETE /api/minions/:minionId`: Delete a single minion by ID.

### 4.2 Ideas (`/api/ideas`)

- `GET /api/ideas`: Get an array of all ideas.
- `POST /api/ideas`: Create a new idea and save it to the DB.
- `GET /api/ideas/:ideaId`: Get a single idea by ID.
- `PUT /api/ideas/:ideaId`: Update a single idea by ID.
- `DELETE /api/ideas/:ideaId`: Delete a single idea by ID.

### 4.3 Meetings (`/api/meetings`)

- `GET /api/meetings`: Get an array of all meetings.
- `POST /api/meetings`: Create a new meeting (generated automatically via `createMeeting` from `db.js`) and save it. No request body required.
- `DELETE /api/meetings`: Delete all meetings from the DB.

### 4.4 Bonus: Work (`/api/minions/:minionId/work`)

- `GET`: Get an array of all work for the specified minion.
- `POST`: Create a new work object for the minion and save it to the DB.
- `PUT /:workId`: Update a single work item by ID.
- `DELETE /:workId`: Delete a single work item by ID.

## 5. Custom Middleware (`server/checkMillionDollarIdea.js`)

- **Function:** `checkMillionDollarIdea`
- **Logic:** Validates that new or updated ideas are worth at least $1,000,000.
- **Calculation:** Total value = `numWeeks` \* `weeklyRevenue`.

## 6. Data Schemas

_Ensure proper parsing between String and Number types for properties originating from client payloads._

- **Minion:** `id` (string), `name` (string), `title` (string), `salary` (number)
- **Idea:** `id` (string), `name` (string), `description` (string), `numWeeks` (number), `weeklyRevenue` (number)
- **Meeting:** `time` (string), `date` (JS Date object), `day` (string), `note` (string)
- **Work (Bonus):** `id` (string), `title` (string), `description` (string), `hours` (number), `minionId` (string)

## 7. Database Utility (`server/db.js`)

Use the provided DB helper functions, passing the model name (`'minions'`, `'ideas'`, `'meetings'`, `'work'`) as the first argument:

- `getAllFromDatabase(model)`
- `getFromDatabaseById(model, id)`
- `addToDatabase(model, instance)`
- `updateInstanceInDatabase(model, instance)`
- `deleteFromDatabasebyId(model, id)`
- `deleteAllFromDatabase(model)`

## 8. Testing

- **Execution:** Run `npm run test` (utilizes Mocha). Tests auto-rerun on file save.
- **Bonus Tests:** To activate, remove the `x` from `xdescribe` around line 689 in `test/test.js`.
  PRD.md
  Displaying PRD.md.
