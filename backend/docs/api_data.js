define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Login User",
    "name": "LoginUser",
    "description": "<p>Verify if the user exits and have the correct password</p>",
    "group": "User",
    "version": "0.1.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/login",
        "type": "url"
      }
    ],
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "nikcname",
            "description": "<p>Nickname of the User.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password ot the User</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"nickname\": \"padrocha\", \n    \"password\": \"pass\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "token",
            "description": "<p>User Token identificaction</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "HTTP/1.1 200 OK\n{\n     token: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCI8.eyJzdWIiOiI1ZTZiZWVmMWNmNjI3OTVkZTBlMWU3OTEiLCJuaWNrbmFtZSI6InBhZHJvY2hhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg4MzkxNTUxLCJleHAiOjE1OTA5ODM1NTF9.kXECNDTfHt6yMdpR__InB6wu0Z8FKs8083mBnyVVaWg\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register User",
    "name": "RegisterUser",
    "description": "<p>Allows an Admin to register a user</p>",
    "group": "User",
    "version": "0.2.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/register",
        "type": "url"
      }
    ],
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "nikcname",
            "description": "<p>Nickname of the User.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password ot the User</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role of the User</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"nickname\": \"padrocha\", \n    \"password\": \"pass\",\n    \"role\": \"admin\"\n}",
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
            "field": "message",
            "description": "<p>Request Header does not contain token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent Token\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "token",
            "description": "<p>User Token identificaction</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "HTTP/1.1 200 OK\n{\n     token: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCI8.eyJzdWIiOiI1ZTZiZWVmMWNmNjI3OTVkZTBlMWU3OTEiLCJuaWNrbmFtZSI6InBhZHJvY2hhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg4MzkxNTUxLCJleHAiOjE1OTA5ODM1NTF9.kXECNDTfHt6yMdpR__InB6wu0Z8FKs8083mBnyVVaWg\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register User",
    "name": "RegisterUser",
    "description": "<p>Allows an Admin to register a user</p>",
    "group": "User",
    "version": "0.1.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/register",
        "type": "url"
      }
    ],
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "nikcname",
            "description": "<p>Nickname of the User.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password ot the User</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role of the User</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"nickname\": \"padrocha\", \n    \"password\": \"pass\",\n    \"role\": \"admin\"\n}",
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
            "field": "message",
            "description": "<p>Request Header does not contain token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent Token\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "token",
            "description": "<p>User Token identificaction</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "HTTP/1.1 200 OK\n{\n     token: \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCI8.eyJzdWIiOiI1ZTZiZWVmMWNmNjI3OTVkZTBlMWU3OTEiLCJuaWNrbmFtZSI6InBhZHJvY2hhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg4MzkxNTUxLCJleHAiOjE1OTA5ODM1NTF9.kXECNDTfHt6yMdpR__InB6wu0Z8FKs8083mBnyVVaWg\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/",
    "title": "Request User Info",
    "name": "ReturnUser",
    "description": "<p>Allow an user to Request his info</p>",
    "group": "User",
    "version": "0.1.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/",
        "type": "url"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "_id",
            "description": "<p>id´s User.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "nikcname",
            "description": "<p>Nickname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": "<p>Role of the User</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"_id\": \"5e6ceef1cf62796de0e1e791\", \n     \"nickname\": \"padrocha\", \n     \"role\": \"$3a$10$WjLK2U2TqVjG8Y5g4qyUC.xJ5h3x8IDtb3VLzZmkKpMAvbnOsNJ0i\"\n}",
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
            "field": "message",
            "description": "<p>Request Header does not contain token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent Token\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent Token\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "User"
  }
] });
