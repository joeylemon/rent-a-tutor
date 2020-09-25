define({ "api": [
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Login",
    "description": "<p>Authenticate the user with their email and password and receive an API token to use for further requests. Subsequent calls to the API should set the Authorization header with the token, such as:</p> <p><code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOj._X_oyzQ9Lz-MedQeXUX7LdFNZyC3</code></p>",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "{\n  \"id\": 1,\n  \"email\": \"joeyclemon@gmail.com\",\n  \"password\": \"$2b$10$De765bJQ6XJV7CgloIxGkOfpetjiDzsbfcWkApas1Ez3DsjHkGJ5S\",\n  \"name\": \"Joey Lemon\",\n  \"phone\": \"6159468534\"\n}",
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
    "url": "/user/list",
    "title": "List users",
    "description": "<p>Get the list of all registered users</p>",
    "permission": [
      {
        "name": "Token",
        "title": "The Authorization header must be set",
        "description": "<p>The Authorization header must be set with a valid API token. For example:</p> <p><code>Authorization: Bearer n8tMnthS$V5*8^iyu1HEhX63</code></p>"
      }
    ],
    "name": "ListUsers",
    "group": "UserGroup",
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/user/user.controller.js",
    "groupTitle": "User",
    "groupDescription": "<p>These endpoints define routes to interact with users.</p>",
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/user/list"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User[]",
            "optional": false,
            "field": "_",
            "description": "<p>List of users</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "_.id",
            "description": "<p>The user's unique id number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_.email",
            "description": "<p>The user's email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_.password",
            "description": "<p>The user's password</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_.name",
            "description": "<p>The user's full name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "_.phone",
            "description": "<p>The user's phone number</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "_.dob",
            "description": "<p>The user's date of birth</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success Response:",
          "content": "[{\n  \"id\": 1,\n  \"email\": \"joeyclemon@gmail.com\",\n  \"password\": \"$2b$10$De765bJQ6XJV7CgloIxGkOfpetjiDzsbfcWkApas1Ez3DsjHkGJ5S\",\n  \"name\": \"Joey Lemon\",\n  \"phone\": \"6159468534\"\n}]",
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