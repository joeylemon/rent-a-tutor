<a name="top"></a>
# rent-a-tutor api v1.0.0



 - [AuthGroup](#AuthGroup)
   - [Login](#Login)
   - [Register user](#Register-user)
 - [UserGroup](#UserGroup)
   - [Current user profile](#Current-user-profile)
   - [User profile](#User-profile)

___


# <a name='AuthGroup'></a> AuthGroup

## <a name='Login'></a> Login
[Back to top](#top)

<p>Authenticate the user with their email and password and receive an API token to use for further requests. Subsequent calls to the API should set the Authorization header with the token, such as:</p> <p><code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOj._X_oyzQ9Lz-MedQeXUX7LdFNZyC3</code></p>

```
POST /auth/login
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| email | `String` | <p>The user's email</p> |
| password | `String` | <p>The user's password</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>The token string to put in the Authorization header</p> |
| expiration | `Number` | <p>The UNIX timestamp at which the token expires</p> |

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
| BadRequestError |  | <p>403 - The request has missing or invalid parameters</p> |

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
| phone | `String` | **optional** <p>The user's phone number</p> |
| dob | `String` | **optional** <p>The user's date of birth</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>The user's unique id number</p> |
| email | `String` | <p>The user's email</p> |
| password | `String` | <p>The user's password</p> |
| name | `String` | <p>The user's full name</p> |
| phone | `String` | **optional**<p>The user's phone number</p> |
| dob | `String` | **optional**<p>The user's date of birth</p> |
| genderId | `Number` | **optional**<p>The user's gender id</p> |
| gender | `Gender` | **optional**<p>The user's gender object</p> |
| gender.id | `Number` | **optional**<p>The user's gender id</p> |
| gender.name | `String` | **optional**<p>The user's gender</p> |

### Success response example

#### Success response example - `Success Response:`

```json
{
  "id": 1,
  "email": "joeyclemon@gmail.com",
  "name": "Joey Lemon",
  "phone": "6159468534",
  "genderId": 1,
  "gender": {
    "id": 1,
    "name": "Male"
  }
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| BadRequestError |  | <p>403 - The request has missing or invalid parameters</p> |

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

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>The user's unique id number</p> |
| email | `String` | <p>The user's email</p> |
| password | `String` | <p>The user's password</p> |
| name | `String` | <p>The user's full name</p> |
| phone | `String` | **optional**<p>The user's phone number</p> |
| dob | `String` | **optional**<p>The user's date of birth</p> |
| genderId | `Number` | **optional**<p>The user's gender id</p> |
| gender | `Gender` | **optional**<p>The user's gender object</p> |
| gender.id | `Number` | **optional**<p>The user's gender id</p> |
| gender.name | `String` | **optional**<p>The user's gender</p> |

### Success response example

#### Success response example - `Success Response:`

```json
{
  "id": 1,
  "email": "joeyclemon@gmail.com",
  "name": "Joey Lemon",
  "phone": "6159468534",
  "genderId": 1,
  "gender": {
    "id": 1,
    "name": "Male"
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

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>The user's unique id number</p> |
| email | `String` | <p>The user's email</p> |
| password | `String` | <p>The user's password</p> |
| name | `String` | <p>The user's full name</p> |
| phone | `String` | **optional**<p>The user's phone number</p> |
| dob | `String` | **optional**<p>The user's date of birth</p> |
| genderId | `Number` | **optional**<p>The user's gender id</p> |
| gender | `Gender` | **optional**<p>The user's gender object</p> |
| gender.id | `Number` | **optional**<p>The user's gender id</p> |
| gender.name | `String` | **optional**<p>The user's gender</p> |

### Success response example

#### Success response example - `Success Response:`

```json
{
  "id": 1,
  "email": "joeyclemon@gmail.com",
  "name": "Joey Lemon",
  "phone": "6159468534",
  "genderId": 1,
  "gender": {
    "id": 1,
    "name": "Male"
  }
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |
