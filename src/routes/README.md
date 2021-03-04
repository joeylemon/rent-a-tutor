<a name="top"></a>
# rent-a-tutor api v1.0.0



 - [AuthGroup](#AuthGroup)
   - [Login](#Login)
   - [Register user](#Register-user)
 - [ListsGroup](#ListsGroup)
   - [List of genders](#List-of-genders)
   - [List of U.S. cities](#List-of-U.S.-cities)
   - [List of U.S. states](#List-of-U.S.-states)
   - [List of user roles](#List-of-user-roles)
 - [UserGroup](#UserGroup)
   - [Change user avatar](#Change-user-avatar)
   - [Current user profile](#Current-user-profile)
   - [Nearby tutors](#Nearby-tutors)
   - [Other user profile](#Other-user-profile)
   - [Update user location](#Update-user-location)
   - [Update user profile](#Update-user-profile)

___


# <a name='AuthGroup'></a> AuthGroup

## <a name='Login'></a> Login
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

## <a name='List-of-U.S.-cities'></a> List of U.S. cities
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

## <a name='List-of-U.S.-states'></a> List of U.S. states
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

## <a name='Change-user-avatar'></a> Change user avatar
[Back to top](#top)

<p>Upload a new image to be the user's avatar</p> <p>Files must be uploaded with the multipart/form-data header. This documentation page is unable to do so, so you can try it out at the <a href="https://jlemon.org/rat/api/v1/docs/multipart.html">multipart/form test page</a></p>

```
POST /user/profile/edit/avatar
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
OK
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

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

## <a name='Nearby-tutors'></a> Nearby tutors
[Back to top](#top)

<p>Get nearby tutors ordered by distance</p>

```
GET /user/nearby/:distance
```

### Headers - `Request Headers`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code></p> |

### Parameters - `URL Parameters`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| distance | `Number` | <p>The distance in miles to search</p> |

### Success response example

#### Success response example - `Success Response:`

```json
 [{
   "id": 11,
   "name": "Joey",
   "phone": "6159468534",
   "dob": "2000-03-24",
   "gender": "Male",
   "role": "Tutor"
}]
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

## <a name='Other-user-profile'></a> Other user profile
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
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

## <a name='Update-user-location'></a> Update user location
[Back to top](#top)

<p>Update the user's location to provide more accurate nearby tutors</p>

```
POST /user/profile/edit/location
```

### Headers - `Request Headers`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code></p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| latitude | `Float` | <p>The new latitude value</p> |
| longitude | `Float` | <p>The new longitude value</p> |

### Success response example

#### Success response example - `Success Response:`

```json
OK
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |

## <a name='Update-user-profile'></a> Update user profile
[Back to top](#top)

<p>Update a specific field of a user's profile</p>

```
POST /user/profile/edit/:field
```

### Headers - `Request Headers`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code></p> |

### Parameters - `URL Parameters`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| field | `String` | <p>The field of the profile to update</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| value | `String` | <p>The field value</p> |

### Success response example

#### Success response example - `Success Response:`

```json
OK
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| UnauthorizedError |  | <p>401 - The request presents invalid authentication values</p> |
| DatabaseError |  | <p>500 - An error occurred with the database</p> |
