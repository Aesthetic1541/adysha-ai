# Auth API

Base URL: `/api/auth`

Authentication uses JWT access/refresh tokens set as httpOnly cookies (via `flask_jwt_extended`). Clients must send requests with credentials included (e.g. `axios` with `withCredentials: true`) so cookies are sent across origins/ports.

---

## POST /api/auth/register

Register a new user.

**Request body**
```json
{
  "name": "John Doe",
  "email": "abc@xy.z",
  "password": "123",
  "confirmation": "123"
}
```

**Responses**
| Status | Condition | Body |
|---|---|---|
| 201 | Success | `{ "message": "Registration successfull", "user": { ...user.to_dict() } }` |
| 400 | Missing `name`, `email`, `password`, or `confirmation` | `{ "error": "Missing required fields" }` |
| 400 | `password` != `confirmation` | `{ "error": "Confirm password is not same as password." }` |
| 400 | Email already registered | `{ "error": "Email already exists" }` |

---

## POST /api/auth/login

Authenticate a user and issue access/refresh tokens as httpOnly cookies.

**Request body**
```json
{
  "email": "abc.xy@z",
  "password": "123"
}
```

**Responses**
| Status | Condition | Body |
|---|---|---|
| 200 | Success | `{ "user": { ...user.to_dict() } }` + `access_token_cookie` and `refresh_token_cookie` set |
| 400 | Missing `email` or `password` | `{ "error": "Username and password required" }` |
| 400 | Invalid email or password | `{ "error": "Invalid login credentials" }` |

---

## POST /api/auth/logout

Clear auth cookies. **Requires** a valid access token (`@jwt_required()`).

**Responses**
| Status | Condition | Body |
|---|---|---|
| 200 | Success | `{ "message": "Logout successfull" }` + cookies unset |

---

## GET /api/auth/me

Return the currently authenticated user. **Requires** a valid access token.

**Responses**
| Status | Condition | Body |
|---|---|---|
| 200 | Success | `{ ...user.to_dict() }` |
| 400 | User ID from token not found in DB | `{ "error": "User not found" }` |

---

## POST /api/auth/refresh

Issue a new access token from a valid refresh token. **Requires** a valid refresh token (`@jwt_required(refresh=True)`).

**Responses**
| Status | Condition | Body |
|---|---|---|
| 200 | Success | `{ "message": "Token generate successfull" }` + new `access_token_cookie` set |

---

## Notes / open items (from source TODOs)

- Status codes for error responses need review (several failure cases currently return `400` where `401`/`404`/`409` may be more correct).
- Error response formats/messages are provisional, pending review.
- Success response on registration needs verification.
- Route URLs need verification.
- Refresh-token strategy needs to be finalized — candidates: frontend checks remaining time and refreshes proactively, frontend refreshes reactively on a failed response (current behavior), or backend checks remaining time on each request and refreshes automatically.