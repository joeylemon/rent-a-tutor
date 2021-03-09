define({ "api": [
  {
    "type": "post",
    "url": "/auth/login",
    "title": "1. Login",
    "description": "<p>Authenticate the user with their email and password and receive an API token. Subsequent calls to the API should set the Authorization header with the API token, such as below:</p> <p><code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOj._X_oyzQ9Lz-MedQeXUX7LdFNZyC3</code></p> <p>Each API token expires in thirty days. The API token should be stored locally on the user's device to prevent logging in every time the application is opened.</p> <p>You can find more in-depth information on authorization in the <a href=\"https://github.com/rent-a-tutor/backend/tree/master/src/routes/auth\">repository's README</a></p>",
    "name": "login",
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
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "{\n    \"token\": \"eyJhbGciOiJIUzI.eyJlbWFpbCI6InRlc3RAdGVz._X_oyzQ9Lz-MedQeXUX7LdF\",\n    \"expiration\": 1600809341558\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/auth/login"
      }
    ],
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/auth/auth.controller.js",
    "groupTitle": "Auth",
    "groupDescription": "<p>These endpoints define routes to authenticate users. There is in-depth documentation on the authorization process in the <a href=\"https://github.com/rent-a-tutor/backend/tree/master/src/routes/auth\">repository's README</a>.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestError",
            "description": "<p>400 - The request has missing or invalid parameters</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>500 - An error occurred with the database</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "2. Register user",
    "description": "<p>Register a new user with the application</p>",
    "name": "register",
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
            "optional": false,
            "field": "city",
            "description": "<p>The user's city</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>The user's state</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>The user's phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dob",
            "description": "<p>The user's date of birth</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "genderId",
            "description": "<p>The user's gender ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roleId",
            "description": "<p>The user's role ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/auth/auth.controller.js",
    "groupTitle": "Auth",
    "groupDescription": "<p>These endpoints define routes to authenticate users. There is in-depth documentation on the authorization process in the <a href=\"https://github.com/rent-a-tutor/backend/tree/master/src/routes/auth\">repository's README</a>.</p>",
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/auth/register"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "{\n    \"id\": 11,\n    \"email\": \"t@t.com\",\n    \"name\": \"Joey\",\n    \"phone\": \"6159468534\",\n    \"dob\": \"2000-03-24\",\n    \"city\": \"Knoxville\",\n    \"state\": \"TN\",\n    \"location\": {\n        \"type\": \"Point\",\n        \"coordinates\": [\n            35.9116543,\n            -84.0866346\n        ]\n    },\n    \"avatar\": \"https://jlemon.org/rat/api/v1/user/profile/11/avatar\",\n    \"createdAt\": \"2021-02-16T16:27:21.000Z\",\n    \"updatedAt\": \"2021-03-04T21:28:26.000Z\",\n    \"gender\": {\n        \"id\": 1,\n        \"name\": \"Male\"\n    },\n    \"role\": {\n        \"id\": 2,\n        \"name\": \"Tutor\"\n    }\n}",
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
            "description": "<p>400 - The request has missing or invalid parameters</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>500 - An error occurred with the database</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lists/cities/:state",
    "title": "5. List of U.S. cities",
    "description": "<p>Retrieve a list of U.S. cities within a state</p>",
    "name": "get_cities",
    "group": "ListsGroup",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>The state to find cities within</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/lists/cities/:state"
      }
    ],
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/lists/lists.controller.js",
    "groupTitle": "Lists",
    "groupDescription": "<p>These endpoints define routes to retrieve serverside lists. Use these endpoints to populate front-end dropdowns. such as profile creation genders.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>500 - An error occurred with the database</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lists/endpoints",
    "title": "1. List of endpoints",
    "description": "<p>Retrieve a list of all API endpoints</p>",
    "name": "get_endpoints",
    "group": "ListsGroup",
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/lists/endpoints"
      }
    ],
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/lists/lists.controller.js",
    "groupTitle": "Lists",
    "groupDescription": "<p>These endpoints define routes to retrieve serverside lists. Use these endpoints to populate front-end dropdowns. such as profile creation genders.</p>"
  },
  {
    "type": "get",
    "url": "/lists/genders",
    "title": "2. List of genders",
    "description": "<p>Retrieve the list of genders</p>",
    "name": "get_genders",
    "group": "ListsGroup",
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/lists/genders"
      }
    ],
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/lists/lists.controller.js",
    "groupTitle": "Lists",
    "groupDescription": "<p>These endpoints define routes to retrieve serverside lists. Use these endpoints to populate front-end dropdowns. such as profile creation genders.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>500 - An error occurred with the database</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lists/roles",
    "title": "3. List of user roles",
    "description": "<p>Retrieve the list of user roles</p>",
    "name": "get_roles",
    "group": "ListsGroup",
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/lists/roles"
      }
    ],
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/lists/lists.controller.js",
    "groupTitle": "Lists",
    "groupDescription": "<p>These endpoints define routes to retrieve serverside lists. Use these endpoints to populate front-end dropdowns. such as profile creation genders.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>500 - An error occurred with the database</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/lists/states",
    "title": "4. List of U.S. states",
    "description": "<p>Retrieve the list of U.S. states</p>",
    "name": "get_states",
    "group": "ListsGroup",
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/lists/states"
      }
    ],
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/lists/lists.controller.js",
    "groupTitle": "Lists",
    "groupDescription": "<p>These endpoints define routes to retrieve serverside lists. Use these endpoints to populate front-end dropdowns. such as profile creation genders.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DatabaseError",
            "description": "<p>500 - An error occurred with the database</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/user/profile/me",
    "title": "1. Current user profile",
    "description": "<p>Get the current user's profile information</p>",
    "permission": [
      {
        "name": "Token",
        "title": "The Authorization header must be set",
        "description": "<p>The Authorization header must be set with a valid API token. For example:</p> <p><code>Authorization: Bearer n8tMnthS$V5*8^iyu1HEhX63</code></p>"
      }
    ],
    "name": "get_current_user_profile",
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
      "examples": [
        {
          "title": "Success Response:",
          "content": "{\n    \"id\": 11,\n    \"email\": \"t@t.com\",\n    \"name\": \"Joey\",\n    \"phone\": \"6159468534\",\n    \"dob\": \"2000-03-24\",\n    \"city\": \"Knoxville\",\n    \"state\": \"TN\",\n    \"location\": {\n        \"type\": \"Point\",\n        \"coordinates\": [\n            35.9116543,\n            -84.0866346\n        ]\n    },\n    \"avatar\": \"https://jlemon.org/rat/api/v1/user/profile/11/avatar\",\n    \"createdAt\": \"2021-02-16T16:27:21.000Z\",\n    \"updatedAt\": \"2021-03-04T21:28:26.000Z\",\n    \"gender\": {\n        \"id\": 1,\n        \"name\": \"Male\"\n    },\n    \"role\": {\n        \"id\": 2,\n        \"name\": \"Tutor\"\n    }\n}",
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
    "url": "/user/nearby/:distance/:page",
    "title": "6. Find nearby tutors",
    "description": "<p>Get nearby tutors ordered by distance. Results are paginated, where the next page URL is given in the result if it exists.</p>",
    "permission": [
      {
        "name": "Token",
        "title": "The Authorization header must be set",
        "description": "<p>The Authorization header must be set with a valid API token. For example:</p> <p><code>Authorization: Bearer n8tMnthS$V5*8^iyu1HEhX63</code></p>"
      }
    ],
    "name": "get_nearby_tutors",
    "group": "UserGroup",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "Number",
            "optional": false,
            "field": "distance",
            "description": "<p>The distance in miles to search</p>"
          },
          {
            "group": "URL Parameters",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>The page to retrieve</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "{\n    \"next\": \"https://jlemon.org/rat/api/v1/user/nearby/500/2\",\n    \"tutors\": [\n        {\n            \"id\": 11,\n            \"name\": \"Bobby\",\n            \"city\": \"Knoxville\",\n            \"state\": \"TN\",\n            \"dob\": \"2000-03-24\",\n            \"gender\": \"Male\",\n            \"role\": \"Tutor\",\n            \"distance\": 6.8858799822053545\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/user/user.controller.js",
    "groupTitle": "User",
    "groupDescription": "<p>These endpoints define routes to interact with users.</p>",
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/user/nearby/:distance/:page"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequestError",
            "description": "<p>400 - The request has missing or invalid parameters</p>"
          },
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
    "title": "5. View other user profile",
    "description": "<p>Get another user's profile information</p>",
    "permission": [
      {
        "name": "Token",
        "title": "The Authorization header must be set",
        "description": "<p>The Authorization header must be set with a valid API token. For example:</p> <p><code>Authorization: Bearer n8tMnthS$V5*8^iyu1HEhX63</code></p>"
      }
    ],
    "name": "get_user_profile",
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
      "examples": [
        {
          "title": "Success Response:",
          "content": "{\n    \"id\": 11,\n    \"email\": \"t@t.com\",\n    \"name\": \"Joey\",\n    \"phone\": \"6159468534\",\n    \"dob\": \"2000-03-24\",\n    \"city\": \"Knoxville\",\n    \"state\": \"TN\",\n    \"location\": {\n        \"type\": \"Point\",\n        \"coordinates\": [\n            35.9116543,\n            -84.0866346\n        ]\n    },\n    \"avatar\": \"https://jlemon.org/rat/api/v1/user/profile/11/avatar\",\n    \"createdAt\": \"2021-02-16T16:27:21.000Z\",\n    \"updatedAt\": \"2021-03-04T21:28:26.000Z\",\n    \"gender\": {\n        \"id\": 1,\n        \"name\": \"Male\"\n    },\n    \"role\": {\n        \"id\": 2,\n        \"name\": \"Tutor\"\n    }\n}",
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
            "description": "<p>400 - The request has missing or invalid parameters</p>"
          },
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
    "url": "/user/profile/me/:fields",
    "title": "4. Get user profile values",
    "description": "<p>Get specific fields of a user's profile</p>",
    "permission": [
      {
        "name": "Token",
        "title": "The Authorization header must be set",
        "description": "<p>The Authorization header must be set with a valid API token. For example:</p> <p><code>Authorization: Bearer n8tMnthS$V5*8^iyu1HEhX63</code></p>"
      }
    ],
    "name": "get_user_profile_values",
    "group": "UserGroup",
    "parameter": {
      "fields": {
        "URL Parameters": [
          {
            "group": "URL Parameters",
            "type": "String",
            "optional": false,
            "field": "fields",
            "description": "<p>The comma-separated list of profile fields to retrieve</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "{\n    \"name\": \"Joey\",\n    \"dob\": \"2000-03-24\",\n    \"phone\": \"6159468534\",\n    \"city\": \"Knoxville\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/user/user.controller.js",
    "groupTitle": "User",
    "groupDescription": "<p>These endpoints define routes to interact with users.</p>",
    "sampleRequest": [
      {
        "url": "https://jlemon.org/rat/api/v1/user/profile/me/:fields"
      }
    ],
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
    "type": "put",
    "url": "/user/profile/me",
    "title": "2. Update user profile",
    "description": "<p>Update fields of a user's profile</p>",
    "permission": [
      {
        "name": "Token",
        "title": "The Authorization header must be set",
        "description": "<p>The Authorization header must be set with a valid API token. For example:</p> <p><code>Authorization: Bearer n8tMnthS$V5*8^iyu1HEhX63</code></p>"
      }
    ],
    "name": "update_user_profile",
    "group": "UserGroup",
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
            "field": "name",
            "description": "<p>The user's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>The user's city</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>The user's state</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>The user's phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dob",
            "description": "<p>The user's date of birth</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "genderId",
            "description": "<p>The user's gender ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roleId",
            "description": "<p>The user's role ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "latitude",
            "description": "<p>The user's latitude</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "longitude",
            "description": "<p>The user's longitude</p>"
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
        "url": "https://jlemon.org/rat/api/v1/user/profile/me"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "{\n    \"name\": \"Success\",\n    \"id\": 1,\n    \"code\": 200,\n    \"message\": \"...\"\n}",
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
            "field": "BadRequestError",
            "description": "<p>400 - The request has missing or invalid parameters</p>"
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
    "type": "put",
    "url": "/user/profile/me/avatar",
    "title": "3. Upload user avatar",
    "description": "<p>Upload a new image to be the user's avatar</p> <p>Files must be uploaded with the multipart/form-data header. This documentation page is unable to do so, so you can try it out at the <a href=\"https://jlemon.org/rat/api/v1/docs/multipart.html\">multipart/form test page</a></p>",
    "permission": [
      {
        "name": "Token",
        "title": "The Authorization header must be set",
        "description": "<p>The Authorization header must be set with a valid API token. For example:</p> <p><code>Authorization: Bearer n8tMnthS$V5*8^iyu1HEhX63</code></p>"
      }
    ],
    "name": "update_user_profile_avatar",
    "group": "UserGroup",
    "header": {
      "fields": {
        "Request Headers": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code></p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "image",
            "description": "<p>The user's new profile picture</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "/home/dustin/rat/src/routes/user/user.controller.js",
    "groupTitle": "User",
    "groupDescription": "<p>These endpoints define routes to interact with users.</p>",
    "success": {
      "examples": [
        {
          "title": "Success Response:",
          "content": "{\n    \"name\": \"Success\",\n    \"id\": 1,\n    \"code\": 200,\n    \"message\": \"...\"\n}",
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
            "description": "<p>400 - The request has missing or invalid parameters</p>"
          },
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
    }
  }
] });