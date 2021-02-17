<a name="top"></a>
# rent-a-tutor api v1.0.0



 - [AuthGroup](#AuthGroup)
   - [Login](#Login)
   - [Refresh API token](#Refresh-API-token)
   - [Register user](#Register-user)
 - [ListsGroup](#ListsGroup)
   - [List of genders](#List-of-genders)
   - [List of user roles](#List-of-user-roles)
 - [UserGroup](#UserGroup)
   - [Current user profile](#Current-user-profile)
   - [User profile](#User-profile)

___


# <a name='AuthGroup'></a> AuthGroup

## <a name='Login'></a> Login
[Back to top](#top)

<p>Authenticate the user with their email and password and receive an API token and a refresh token. Subsequent calls to the API should set the Authorization header with the API token, such as:</p> <p><code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOj._X_oyzQ9Lz-MedQeXUX7LdFNZyC3</code></p> <p>Each API token expires in five minutes. Therefore, you must use the refresh token with /auth/refresh to receive a new API token.</p> <p>With this infrastructure, only the refresh token must be stored on the user's device to keep the user logged in upon reopening the application (instead of the user's email and password).</p> <p>Since refresh tokens expire in 30 days, users must only re-enter their credentials once every month.</p> <p>You can find more in-depth information on authorization in the <a href="https://github.com/rent-a-tutor/backend/tree/master/src/routes/auth">repository's README</a></p>

```
POST /auth/login
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| email | `String` | <p>The user's email</p> |
| password | `String` | <p>The user's password</p> |

### Success response example

#### Success response example - `Success Response:`

```json
{
  "api": {
      "token": "eyJhbGciOiJIUzI.eyJlbWFpbCI6InRlc3RAdGVz._X_oyzQ9Lz-MedQeXUX7LdF",
      "expiration": 1600809341558
  },
  "refresh": {
      "token": "eyJhbGciOiJIUzI.eyJlbWFpbCI6InRlc3RAdGVz.RVcYtudHgdZBZmgqlERsZfe",
      "expiration": 1601441505925
  }
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| BadRequestError |  | <p>400 - The request has missing or invalid parameters</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

## <a name='Refresh-API-token'></a> Refresh API token
[Back to top](#top)

<p>Using the user's stored refresh token, receive a new API token that will be used in subsequent calls to the API within the Authorization header.</p>

```
POST /auth/refresh
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| refresh_token | `String` | <p>The user's stored refresh token</p> |

### Success response example

#### Success response example - `Success Response:`

```json
{
  "token": "eyJhbGciOiJIUzI.eyJlbWFpbCI6InRlc3RAdGVz._X_oyzQ9Lz-MedQeXUX7LdF",
  "expiration": 1600809341558
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| BadRequestError |  | <p>400 - The request has missing or invalid parameters</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

## <a name='Register-user'></a> Register user
[Back to top](#top)

<p>Register a new user with the application</p>

```
POST /auth/register
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| email | `String` | <p>The user's email</p> |
| password | `String` | <p>The user's password</p> |
| name | `String` | <p>The user's name</p> |
| city | `String` | <p>The user's city</p> |
| state | `String` | <p>The user's state</p> |
| phone | `String` | <p>The user's phone number</p> |
| dob | `String` | <p>The user's date of birth</p> |
| genderId | `String` | <p>The user's gender ID</p> |
| roleId | `String` | <p>The user's role ID</p> |

### Success response example

#### Success response example - `Success Response:`

```json
 {
   "id": 11,
   "email": "t@t.com",
   "name": "Joey",
   "phone": "6159468534",
   "dob": "2000-03-24",
   "createdAt": "2021-02-16T16:27:21.000Z",
   "updatedAt": "2021-02-16T16:27:21.000Z",
   "gender": {
       "id": 1,
       "name": "Male"
   },
   "role": {
       "id": 1,
       "name": "Student"
   }
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| BadRequestError |  | <p>400 - The request has missing or invalid parameters</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

# <a name='ListsGroup'></a> ListsGroup

## <a name='List-of-genders'></a> List of genders
[Back to top](#top)

<p>Retrieve the list of genders</p>

```
GET /lists/genders
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

## <a name='List-of-user-roles'></a> List of user roles
[Back to top](#top)

<p>Retrieve the list of user roles</p>

```
GET /lists/roles
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

# <a name='UserGroup'></a> UserGroup

## <a name='Current-user-profile'></a> Current user profile
[Back to top](#top)

<p>Get the current user's profile information</p>

```
GET /user/profile/me
```

### Headers - `Request Headers`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code></p> |

### Success response example

#### Success response example - `Success Response:`

```json
 {
   "id": 11,
   "email": "t@t.com",
   "name": "Joey",
   "phone": "6159468534",
   "dob": "2000-03-24",
   "createdAt": "2021-02-16T16:27:21.000Z",
   "updatedAt": "2021-02-16T16:27:21.000Z",
   "gender": {
       "id": 1,
       "name": "Male"
   },
   "role": {
       "id": 1,
       "name": "Student"
   }
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

## <a name='User-profile'></a> User profile
[Back to top](#top)

<p>Get a user's profile information</p>

```
GET /user/profile/:id
```

### Headers - `Request Headers`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code></p> |

### Parameters - `URL Parameters`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>The id of the user to retrieve</p> |

### Success response example

#### Success response example - `Success Response:`

```json
 {
   "id": 11,
   "email": "t@t.com",
   "name": "Joey",
   "phone": "6159468534",
   "dob": "2000-03-24",
   "createdAt": "2021-02-16T16:27:21.000Z",
   "updatedAt": "2021-02-16T16:27:21.000Z",
   "gender": {
       "id": 1,
       "name": "Male"
   },
   "role": {
       "id": 1,
       "name": "Student"
   }
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |
