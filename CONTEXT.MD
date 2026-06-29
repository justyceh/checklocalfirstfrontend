# CheckLocalFirst — Backend API Reference

> This file is for the frontend building agent. Read this before building any page.
> Always use these routes, request shapes, and response shapes when writing fetch calls.

---

## Base URL

```
https://<your-render-api>.onrender.com
```

Replace with the actual Render URL. Store in `.env.local` as `NEXT_PUBLIC_API_URL`.

---

## Auth

- Auth is handled via Supabase on the backend.
- On login, the API returns an `access_token` (JWT).
- Store the token in `localStorage` as `access_token`.
- For all protected routes, pass the token in the request header:

```
Authorization: Bearer <access_token>
```

- Account types: `"user"`, `"business"`, `"admin"`

---

## Routes

### AUTH — `/auth`

---

#### `POST /auth/signup/user`
Register a regular user account.

**Body:**
```json
{
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
```

**Response `201`:**
```json
{ "message": "Account successfully created" }
```

---

#### `POST /auth/signup/business`
Register a business owner account and create a business listing in one step.
Slug is auto-generated from the business name.

**Body:**
```json
{
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "password": "string",
  "name": "string",
  "description": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "zip": "string",
  "phone": "string"
}
```

**Response `201`:**
```json
{ "message": "User and Business account successfully created" }
```

---

#### `POST /auth/login`
Log in with email and password.

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response `200`:**
```json
{
  "message": "Successful log in",
  "access_token": "string",
  "user_id": "string",
  "email": "string",
  "accountType": "user" | "business" | "admin"
}
```

> Store `access_token`, `user_id`, and `accountType` in localStorage after login.

---

#### `POST /auth/logout`
🔒 Requires auth.
Logs the current user out.

**Response `200`:**
```json
{ "message": "User successfully signed out" }
```

---

#### `POST /auth/admin/create-user/:account_type`
🔒 Requires auth (admin only) — protected by `authMiddleware` + `authAdminMiddleware` in sequence.
Creates a user with a specific account type (`user`, `business`, or `admin`).

**Params:** `:account_type` — must be exactly `user`, `business`, or `admin`. Any other value returns a `400`.

**Body:**
```json
{
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
```

**Response `201`:**
```json
{ "message": "User successfully created" }
```

**Response `400`** (invalid `:account_type`):
```json
{ "message": "Error creating account" }
```

---

### BUSINESSES — `/businesses`

> Public business routes only return businesses with `status: "active"`. Suspended businesses are hidden from all public endpoints below, but remain visible to admins via the `/admin` routes.

---

#### `GET /businesses`
Returns all **active** business listings.

**Response `200`:** Array of business objects.
```json
[
  {
    "id": "uuid",
    "owner_user_id": "uuid",
    "name": "string",
    "slug": "string",
    "description": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "phone": "string",
    "email": "string",
    "status": "active" | "suspended"
  }
]
```

---

#### `GET /businesses/:slug`
Returns a single **active** business by slug. Suspended businesses will not resolve here, even with a direct link.

**Response `200`:** Single business object (same shape as above).

---

#### `GET /businesses/:slug/services`
Returns all services for a business.

**Response `200`:**
```json
{
  "data": [
    {
      "id": "uuid",
      "business_id": "uuid",
      "name": "string",
      "description": "string",
      "price": "number",
      "category_id": "uuid"
    }
  ]
}
```

---

#### `POST /businesses/:slug/services`
🔒 Requires auth (must be business owner).
Adds a new service to a business.

**Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "category_id": "uuid"
}
```

**Response `201`:**
```json
{ "message": "Service for business added" }
```

---

#### `PUT /businesses/:slug/services/:id`
🔒 Requires auth (must be business owner).
Updates an existing service.

**Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "category_id": "uuid"
}
```

**Response `200`:**
```json
{ "message": "Service for business updated" }
```

---

#### `DELETE /businesses/:slug/services/:id`
🔒 Requires auth (must be business owner).
Deletes a service.

**Response `200`:**
```json
{ "message": "Service for business deleted" }
```

---

#### `PUT /businesses/:slug`
🔒 Requires auth (must be business owner).
Updates a business listing.

**Body:**
```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "zip": "string",
  "phone": "string",
  "email": "string"
}
```

**Response `200`:**
```json
{ "message": "<name> successfully updated" }
```

---

#### `DELETE /businesses/:slug`
🔒 Requires auth (must be business owner).
Deletes a business listing. This is a full account teardown: deletes the business's services (cascade), the business itself, the owner's `users` row, and the owner's Supabase Auth account.

**Response `200`:**
```json
{ "message": "Business successfully deleted" }
```

---

### CATEGORIES — `/categories`

---

#### `GET /categories`
Returns all categories.

**Response `200`:**
```json
{
  "message": "Got categories successfully",
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "slug": "string"
    }
  ]
}
```

---

### SEARCH — `/search`

---

#### `GET /search?q=&category=`
Search services. Supports keyword search, category filtering, or both.

**Query Params:**
| Param | Required | Description |
|---|---|---|
| `q` | No* | Keyword search term |
| `category` | No* | Category slug (e.g. `"plumbing"`) |

> At least one of `q` or `category` must be provided.

**Search tiers (automatic, internal):**
1. Full-text search via `search_vector`
2. Fallback: `ilike` name match
3. Fallback: fuzzy RPC match

**Response `200`:** Array of service objects with nested business info.
```json
[
  {
    "id": "uuid",
    "business_id": "uuid",
    "name": "string",
    "description": "string",
    "price": "number",
    "category_id": "uuid",
    "businesses": {
      "id": "uuid",
      "name": "string",
      "slug": "string",
      "address": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "phone": "string",
      "email": "string"
    }
  }
]
```

---

### SERVICES — `/services`

---

#### `GET /services`
Returns all services with basic business info.

**Response `200`:**
```json
{
  "message": "Got services successfully",
  "data": [
    {
      "id": "uuid",
      "business_id": "uuid",
      "name": "string",
      "description": "string",
      "price": "number",
      "category_id": "uuid",
      "businesses": {
        "name": "string",
        "slug": "string"
      }
    }
  ]
}
```

---

### USERS — `/users`

---

#### `GET /users`
🔒 Requires auth (admin only).
Returns all users.

**Response `200`:**
```json
{
  "message": "Got users successfully",
  "data": [
    {
      "user_id": "uuid",
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "phone": "string",
      "account_type": "user" | "business" | "admin"
    }
  ]
}
```

---

#### `GET /users/me`
🔒 Requires auth.
Returns the currently logged-in user's profile.

**Response `200`:**
```json
{
  "message": "Got users info",
  "data": {
    "user_id": "uuid",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone": "string",
    "account_type": "user" | "business" | "admin"
  }
}
```

---

#### `GET /users/:id`
Returns a user by ID (public).

**Response `200`:**
```json
{
  "message": "Got user successfully",
  "data": { ...user object }
}
```

---

#### `PUT /users/me`
🔒 Requires auth.
Updates the currently logged-in user's profile.

**Body:**
```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "phone": "string"
}
```

**Response `200`:**
```json
{ "message": "Updated user info" }
```

---

## Favorites

All favorites routes require authentication. Include the auth token in every request:
`Authorization: Bearer <token>`

---

### Get User Favorites
`GET /favorites`

Returns all favorites for the logged in user, with full business data joined.

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "business_id": 1,
      "created_at": "timestamp",
      "businesses": {
        "id": 1,
        "name": "Business Name",
        "slug": "business-slug",
        ...
      }
    }
  ]
}
```

---

### Add Favorite
`POST /favorites`

**Request body:**
```json
{
  "business_id": 1
}
```

**Response 201:**
```json
{
  "message": "Added to favorites"
}
```

---

### Remove Favorite
`DELETE /favorites/:business_id`

**URL param:** `business_id` — the ID of the business to unfavorite.

**Response 200:**
```json
{
  "message": "Removed from favorites"
}
```

---

## ADMIN — `/admin`

🔒 Every route below requires auth **and** an admin account. Enforced at the router level via `router.use(authMiddleware, authAdminMiddleware)` — there are no exceptions, so no individual route needs the middleware repeated.

These routes are for internal moderation use (spam signups, fake listings, garbage data) — not part of the public-facing app. Unlike the public `/businesses` routes, these return businesses **regardless of status**, since reviewing suspended/flagged listings is the point.

---

#### `GET /admin/businesses`
Returns all businesses, any status, sorted newest first.

**Response `200`:** Array of business objects (full row, including `status`).

---

#### `GET /admin/businesses/:id`
Returns a single business by `id`, any status.

**Response `200`:** Single business object.

**Response `404`:**
```json
{ "error": "..." }
```

---

#### `PATCH /admin/businesses/:id/status`
Sets a business's status. Partial update — only `status` is changed, nothing else.

**Body:**
```json
{ "status": "active" | "suspended" }
```

**Response `200`:**
```json
{ "message": "Business status updated" }
```

**Response `400`** (invalid status value):
```json
{ "error": "Invalid status value" }
```

**Response `404`** (business not found):
```json
{ "error": "Business not found" }
```

---

#### `DELETE /admin/businesses/:id`
Full cascade delete: business's services (DB-level `CASCADE`), the business row itself, the owner's `users` row, and the owner's Supabase Auth account. Mirrors the owner-facing `DELETE /businesses/:slug` behavior — deleting a business as an admin is equivalent to deleting the owner's account.

**Response `200`:**
```json
{ "message": "Business successfully deleted" }
```

**Response `404`** (business not found):
```json
{ "error": "Business not found" }
```

---

#### `GET /admin/users`
Returns all users, sorted newest first. Useful for spotting signup bursts or accounts with no associated business.

**Response `200`:** Array of full user rows.

---

#### `GET /admin/users/:id`
Returns a single user by `user_id`.

**Response `200`:** Single user object.

**Response `500`** (not found / query error):
```json
{ "error": "..." }
```

---

#### `DELETE /admin/users/:id`
Deletes a user's `users` row and Supabase Auth account. If the user owns a business, that business is **not** deleted — its `owner_user_id` is set to `NULL` (DB-level `SET NULL`), and the listing remains live.

Includes two safety checks:
- **Self-lockout protection** — an admin cannot delete their own account.
- **Last-admin protection** — the last remaining `account_type: "admin"` row cannot be deleted.

**Response `200`:**
```json
{ "message": "User successfully deleted" }
```

**Response `400`** (self-delete attempt):
```json
{ "error": "You cannot delete your own admin account" }
```

**Response `400`** (last admin):
```json
{ "error": "Cannot delete the last remaining admin account" }
```

**Response `404`** (user not found):
```json
{ "error": "User not found" }
```

---

#### `GET /admin/stats`
Returns basic moderation/health counts.

**Response `200`:**
```json
{
  "totalBusinesses": "number",
  "totalUsers": "number",
  "newSignupsLast24Hours": "number"
}
```

---

## Frontend Conventions

- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- File extension: `.tsx`
- Design tokens:
  - Primary dark green: `#1a3328`
  - Sage accent: `#7ec9a4`
  - Heading font: Playfair Display (serif)
  - Body/UI font: DM Sans

## Auth Helper (suggested pattern)

```ts
export function getAuthHeaders() {
  const token = localStorage.getItem('access_token');
  return { Authorization: `Bearer ${token}` };
}
```