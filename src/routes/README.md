<a name="top"></a>
# rent-a-tutor api v1.0.0



 - [AuthGroup](#AuthGroup)
   - [1. Login](#1.-Login)
   - [2. Register user](#2.-Register-user)
 - [ListsGroup](#ListsGroup)
   - [1. List of endpoints](#1.-List-of-endpoints)
   - [2. List of genders](#2.-List-of-genders)
   - [3. List of user roles](#3.-List-of-user-roles)
   - [4. List of U.S. states](#4.-List-of-U.S.-states)
   - [5. List of U.S. cities](#5.-List-of-U.S.-cities)
 - [UserGroup](#UserGroup)
   - [1. Current user profile](#1.-Current-user-profile)
   - [2. Update user profile](#2.-Update-user-profile)
   - [3. Delete user](#3.-Delete-user)
   - [4. Upload user avatar](#4.-Upload-user-avatar)
   - [5. Get user profile values](#5.-Get-user-profile-values)
   - [6. View other user profile](#6.-View-other-user-profile)
   - [7. Find nearby tutors](#7.-Find-nearby-tutors)

___


# <a name='AuthGroup'></a> AuthGroup

## <a name='1.-Login'></a> 1. Login
[Back to top](#top)

<p>Authenticate the user with their email and password and receive an API token. Subsequent calls to the API should set the Authorization header with the API token, such as below:</p> <p><code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOj._X_oyzQ9Lz-MedQeXUX7LdFNZyC3</code></p> <p>Each API token expires in thirty days. The API token should be stored locally on the user's device to prevent logging in every time the application is opened.</p> <p>You can find more in-depth information on authorization in the <a href="https://github.com/rent-a-tutor/backend/tree/master/src/routes/auth">repository's README</a></p>

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

## <a name='2.-Register-user'></a> 2. Register user
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

# <a name='ListsGroup'></a> ListsGroup

## <a name='1.-List-of-endpoints'></a> 1. List of endpoints
[Back to top](#top)

<p>Retrieve a list of all API endpoints</p>

```
GET /lists/endpoints
```

## <a name='2.-List-of-genders'></a> 2. List of genders
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

## <a name='3.-List-of-user-roles'></a> 3. List of user roles
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

## <a name='4.-List-of-U.S.-states'></a> 4. List of U.S. states
[Back to top](#top)

<p>Retrieve the list of U.S. states</p>

```
GET /lists/states
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

## <a name='5.-List-of-U.S.-cities'></a> 5. List of U.S. cities
[Back to top](#top)

<p>Retrieve a list of U.S. cities within a state</p>

```
GET /lists/cities/:state
```

### Parameters - `URL Parameters`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| state | `String` | <p>The state to find cities within</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

# <a name='UserGroup'></a> UserGroup

## <a name='1.-Current-user-profile'></a> 1. Current user profile
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
    "city": "Knoxville",
    "state": "TN",
    "location": {
        "type": "Point",
        "coordinates": [
            35.9116543,
            -84.0866346
        ]
    },
    "avatar": "https://jlemon.org/rat/api/v1/user/profile/11/avatar",
    "createdAt": "2021-02-16T16:27:21.000Z",
    "updatedAt": "2021-03-04T21:28:26.000Z",
    "gender": {
        "id": 1,
        "name": "Male"
    },
    "role": {
        "id": 2,
        "name": "Tutor"
    }
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

## <a name='2.-Update-user-profile'></a> 2. Update user profile
[Back to top](#top)

<p>Update fields of a user's profile</p>

```
PUT /user/profile/me
```

### Headers - `Request Headers`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code></p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| email | `String` | <p>The user's email</p> |
| name | `String` | <p>The user's name</p> |
| city | `String` | <p>The user's city</p> |
| state | `String` | <p>The user's state</p> |
| phone | `String` | <p>The user's phone number</p> |
| dob | `String` | <p>The user's date of birth</p> |
| genderId | `String` | <p>The user's gender ID</p> |
| roleId | `String` | <p>The user's role ID</p> |
| latitude | `String` | <p>The user's latitude</p> |
| longitude | `String` | <p>The user's longitude</p> |

### Success response example

#### Success response example - `Success Response:`

```json
{
    "name": "Success",
    "id": 1,
    "code": 200,
    "message": "..."
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| BadRequestError |  | <p>400 - The request has missing or invalid parameters</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

## <a name='3.-Delete-user'></a> 3. Delete user
[Back to top](#top)

<p>Delete the user's account</p>

```
DELETE /user/profile/me
```

### Headers - `Request Headers`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code></p> |

### Success response example

#### Success response example - `Success Response:`

```json
{
    "name": "Success",
    "id": 1,
    "code": 200,
    "message": "..."
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| BadRequestError |  | <p>400 - The request has missing or invalid parameters</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

## <a name='4.-Upload-user-avatar'></a> 4. Upload user avatar
[Back to top](#top)

<p>Upload a new image to be the user's avatar</p> <p>Files must be uploaded with the multipart/form-data header. This documentation page is unable to do so, so you can try it out at the <a href="https://jlemon.org/rat/api/v1/docs/multipart.html">multipart/form test page</a></p>

```
PUT /user/profile/me/avatar
```

### Headers - `Request Headers`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Content-Type | `String` | <p>multipart/form-data</p> |
| Authorization | `String` | <p>The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code></p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| image | `File` | <p>The user's new profile picture</p> |

### Success response example

#### Success response example - `Success Response:`

```json
{
    "name": "Success",
    "id": 1,
    "code": 200,
    "message": "..."
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| BadRequestError |  | <p>400 - The request has missing or invalid parameters</p> |
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

## <a name='5.-Get-user-profile-values'></a> 5. Get user profile values
[Back to top](#top)

<p>Get specific fields of a user's profile</p>

```
GET /user/profile/me/:fields
```

### Headers - `Request Headers`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code></p> |

### Parameters - `URL Parameters`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| fields | `String` | <p>The comma-separated list of profile fields to retrieve</p> |

### Success response example

#### Success response example - `Success Response:`

```json
{
    "name": "Joey",
    "dob": "2000-03-24",
    "phone": "6159468534",
    "city": "Knoxville"
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

## <a name='6.-View-other-user-profile'></a> 6. View other user profile
[Back to top](#top)

<p>Get another user's profile information</p>

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
    "city": "Knoxville",
    "state": "TN",
    "location": {
        "type": "Point",
        "coordinates": [
            35.9116543,
            -84.0866346
        ]
    },
    "avatar": "https://jlemon.org/rat/api/v1/user/profile/11/avatar",
    "createdAt": "2021-02-16T16:27:21.000Z",
    "updatedAt": "2021-03-04T21:28:26.000Z",
    "gender": {
        "id": 1,
        "name": "Male"
    },
    "role": {
        "id": 2,
        "name": "Tutor"
    }
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| BadRequestError |  | <p>400 - The request has missing or invalid parameters</p> |
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

## <a name='7.-Find-nearby-tutors'></a> 7. Find nearby tutors
[Back to top](#top)

<p>Get nearby tutors ordered by distance. Results are paginated, where the next page URL is given in the result if it exists.</p>

```
GET /user/nearby/:distance/:page
```

### Headers - `Request Headers`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code></p> |

### Parameters - `URL Parameters`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| distance | `Number` | <p>The distance in miles to search</p> |
| page | `Number` | <p>The page to retrieve</p> |

### Success response example

#### Success response example - `Success Response:`

```json
{
    "next": "https://jlemon.org/rat/api/v1/user/nearby/500/2",
    "tutors": [
        {
            "id": 11,
            "name": "Bobby",
            "city": "Knoxville",
            "state": "TN",
            "dob": "2000-03-24",
            "gender": "Male",
            "role": "Tutor",
            "distance": 6.8858799822053545
        }
    ]
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| BadRequestError |  | <p>400 - The request has missing or invalid parameters</p> |
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |
