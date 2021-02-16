define({ "api": [
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Login",
    "description": "<p>Authenticate the user with their email and password and receive an API token and a refresh token. Subsequent calls to the API should set the Authorization header with the API token, such as:</p> <p><code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOj._X_oyzQ9Lz-MedQeXUX7LdFNZyC3</code></p> <p>Each API token expires in five minutes. Therefore, you must use the refresh token with /auth/refresh to receive a new API token.</p> <p>With this infrastructure, only the refresh token must be stored on the user's device to keep the user logged in upon reopening the application (instead of the user's email and password).</p> <p>Since refresh tokens expire in 30 days, users must only re-enter their credentials once every month.</p>",
    "name": "UserLogin",
    "group": "AuthGroup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/auth/login"
      }
    ],
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/auth/auth.controller.js",
    "groupTitle": "Auth",
    "groupDescription": "<p>These endpoints define routes to authenticate users</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "api",
            "description": "<p>The API token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "api.token",
            "description": "<p>The token string to put in the Authorization header</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "api.expiration",
            "description": "<p>The UNIX timestamp at which the token expires (5 minutes after)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "refresh",
            "description": "<p>The refresh token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "refresh.token",
            "description": "<p>The token string to store on the device</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "refresh.expiration",
            "description": "<p>The UNIX timestamp at which the token expires (30 days after)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "{\n  \"api\": {\n      \"token\": \"eyJhbGciOiJIUzI.eyJlbWFpbCI6InRlc3RAdGVz._X_oyzQ9Lz-MedQeXUX7LdF\",\n      \"expiration\": 1600809341558\n  },\n  \"refresh\": {\n      \"token\": \"eyJhbGciOiJIUzI.eyJlbWFpbCI6InRlc3RAdGVz.RVcYtudHgdZBZmgqlERsZfe\",\n      \"expiration\": 1601441505925\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestError",
            "description": "<p>403 - The request has missing or invalid parameters</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/auth/refresh",
    "title": "Refresh API token",
    "description": "<p>Using the user's stored refresh token, receive a new API token that will be used in subsequent calls to the API within the Authorization header.</p>",
    "name": "UserRefreshToken",
    "group": "AuthGroup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refresh_token",
            "description": "<p>The user's stored refresh token</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/auth/refresh"
      }
    ],
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/auth/auth.controller.js",
    "groupTitle": "Auth",
    "groupDescription": "<p>These endpoints define routes to authenticate users</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token string to put in the Authorization header</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "expiration",
            "description": "<p>The UNIX timestamp at which the token expires</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "{\n  \"token\": \"eyJhbGciOiJIUzI.eyJlbWFpbCI6InRlc3RAdGVz._X_oyzQ9Lz-MedQeXUX7LdF\",\n  \"expiration\": 1600809341558\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestError",
            "description": "<p>403 - The request has missing or invalid parameters</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Register user",
    "description": "<p>Register a new user with the application</p>",
    "name": "UserRegister",
    "group": "AuthGroup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The user's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>The user's phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "dob",
            "description": "<p>The user's date of birth</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/auth/auth.controller.js",
    "groupTitle": "Auth",
    "groupDescription": "<p>These endpoints define routes to authenticate users</p>",
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/auth/register"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The user's unique id number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The user's full name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>The user's phone number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "dob",
            "description": "<p>The user's date of birth</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "genderId",
            "description": "<p>The user's gender id</p>"
          },
          {
            "group": "Success 200",
            "type": "Gender",
            "optional": true,
            "field": "gender",
            "description": "<p>The user's gender object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "gender.id",
            "description": "<p>The user's gender id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "gender.name",
            "description": "<p>The user's gender</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "{\n  \"id\": 1,\n  \"email\": \"joeyclemon@gmail.com\",\n  \"name\": \"Joey Lemon\",\n  \"phone\": \"6159468534\",\n  \"genderId\": 1,\n  \"gender\": {\n    \"id\": 1,\n    \"name\": \"Male\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestError",
            "description": "<p>403 - The request has missing or invalid parameters</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/user/profile/me",
    "title": "Current user profile",
    "description": "<p>Get the current user's profile information</p>",
    "permission": [
      {
        "name": "Token",
        "title": "The Authorization header must be set",
        "description": "<p>The Authorization header must be set with a valid API token. For example:</p> <p><code>Authorization: Bearer n8tMnthS$V5*8^iyu1HEhX63</code></p>"
      }
    ],
    "name": "CurrentUserProfile",
    "group": "UserGroup",
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/user/user.controller.js",
    "groupTitle": "User",
    "groupDescription": "<p>These endpoints define routes to interact with users.</p>",
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/user/profile/me"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The user's unique id number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The user's full name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>The user's phone number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "dob",
            "description": "<p>The user's date of birth</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "genderId",
            "description": "<p>The user's gender id</p>"
          },
          {
            "group": "Success 200",
            "type": "Gender",
            "optional": true,
            "field": "gender",
            "description": "<p>The user's gender object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "gender.id",
            "description": "<p>The user's gender id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "gender.name",
            "description": "<p>The user's gender</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "{\n  \"id\": 1,\n  \"email\": \"joeyclemon@gmail.com\",\n  \"name\": \"Joey Lemon\",\n  \"phone\": \"6159468534\",\n  \"genderId\": 1,\n  \"gender\": {\n    \"id\": 1,\n    \"name\": \"Male\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>401 - The request presents invalid authentication values</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>500 - An error occurred with the database</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Request Headers": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code></p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/user/profile/:id",
    "title": "User profile",
    "description": "<p>Get a user's profile information</p>",
    "permission": [
      {
        "name": "Token",
        "title": "The Authorization header must be set",
        "description": "<p>The Authorization header must be set with a valid API token. For example:</p> <p><code>Authorization: Bearer n8tMnthS$V5*8^iyu1HEhX63</code></p>"
      }
    ],
    "name": "UserProfile",
    "group": "UserGroup",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the user to retrieve</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/user/user.controller.js",
    "groupTitle": "User",
    "groupDescription": "<p>These endpoints define routes to interact with users.</p>",
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/user/profile/:id"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The user's unique id number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The user's full name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>The user's phone number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "dob",
            "description": "<p>The user's date of birth</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "genderId",
            "description": "<p>The user's gender id</p>"
          },
          {
            "group": "Success 200",
            "type": "Gender",
            "optional": true,
            "field": "gender",
            "description": "<p>The user's gender object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": true,
            "field": "gender.id",
            "description": "<p>The user's gender id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "gender.name",
            "description": "<p>The user's gender</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "{\n  \"id\": 1,\n  \"email\": \"joeyclemon@gmail.com\",\n  \"name\": \"Joey Lemon\",\n  \"phone\": \"6159468534\",\n  \"genderId\": 1,\n  \"gender\": {\n    \"id\": 1,\n    \"name\": \"Male\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnauthorizedError",
            "description": "<p>401 - The request presents invalid authentication values</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>500 - An error occurred with the database</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Request Headers": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code></p>"
          }
        ]
      }
    }
  }
] });