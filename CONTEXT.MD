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
🔒 Requires auth (admin only).
Creates a user with a specific account type (`user`, `business`, or `admin`).

**Params:** `:account_type`

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

---

### BUSINESSES — `/businesses`

---

#### `GET /businesses`
Returns all business listings.

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
    "email": "string"
  }
]
```

---

#### `GET /businesses/:slug`
Returns a single business by slug.

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
Deletes a business listing.

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