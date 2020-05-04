define({ "api": [
  {
    "type": "get",
    "url": "/line",
    "title": "List Line",
    "name": "ListLine",
    "description": "<p>Show all Line documents</p>",
    "group": "Line",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>This function is restricted for logged in users.</p>"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/line",
        "type": "url"
      }
    ],
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "Line",
    "parameter": {
      "fields": {
        "Success 200 [Array]": [
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Line identifier</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Line name</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "Date",
            "optional": false,
            "field": "started",
            "description": "<p>Line creation date</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": [   \n        {\n            \"_id\": \"ACCSEH\",\n            \"name\": \"Accesorios (SEH)\",\n            \"started\": \"2020-04-21T20:25:10.395Z\",\n            \"__v\": 0\n        }\n    ]\n}",
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
            "field": "Concflict",
            "description": "<p>An internal error ocurred</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>Server didn´t find request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Conflict-Response:",
          "content": "HTTP/1.1 406 Indicates that the request could not be processed because of conflict in the current state of the resource\n{\n    \"message\": \"Internal error, probably error with params\"\n}",
          "type": "json"
        },
        {
          "title": "Not_Found-Response:",
          "content": "HTTP/1.1 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.\n{\n    \"message\": \"Document not found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/line/total/key",
    "title": "List Line Key",
    "name": "ListLineTotalKey",
    "description": "<p>Show all Line documents adding the total of Keys that belong to the line</p>",
    "group": "Line",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>This function is restricted for logged in users.</p>"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/line/total/key",
        "type": "url"
      }
    ],
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "Line",
    "parameter": {
      "fields": {
        "Success 200 [Array]": [
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Line identifier</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Line name</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "Date",
            "optional": false,
            "field": "started",
            "description": "<p>Line creation date</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "Number",
            "optional": false,
            "field": "countKeys",
            "description": "<p>Total Key in Line</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": [\n        {\n            \"_id\": \"ACCSEH\",\n            \"name\": \"Accesorios (SEH)\",\n            \"started\": \"2020-04-21T20:25:10.395Z\",\n            \"countKeys\": 26\n        }\n    ]\n}",
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
            "field": "Concflict",
            "description": "<p>An internal error ocurred</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>Server didn´t find request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Conflict-Response:",
          "content": "HTTP/1.1 406 Indicates that the request could not be processed because of conflict in the current state of the resource\n{\n    \"message\": \"Internal error, probably error with params\"\n}",
          "type": "json"
        },
        {
          "title": "Not_Found-Response:",
          "content": "HTTP/1.1 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.\n{\n    \"message\": \"Document not found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/line/total/key/page/:page",
    "title": "List Line Key Page",
    "name": "ListLineTotalKeyPage",
    "description": "<p>Show all Line documents adding the total of Keys that belong to the line with the paged format</p>",
    "group": "Line",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>This function is restricted for logged in users.</p>"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/line/total/key/page/1",
        "type": "url"
      }
    ],
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "Line",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "number",
            "optional": false,
            "field": "page",
            "description": "<p>Number of page.</p>"
          }
        ],
        "Success 200 [Array]": [
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Line identifier</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Line name</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "Date",
            "optional": false,
            "field": "started",
            "description": "<p>Line creation date</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "Number",
            "optional": false,
            "field": "countKeys",
            "description": "<p>Total Key in Line</p>"
          }
        ],
        "Paged format": [
          {
            "group": "Paged format",
            "type": "Array",
            "optional": false,
            "field": "docs",
            "description": "<p>Array of Line Documents</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "totalDocs",
            "description": "<p>Total number of documents in collection that match a query</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit that was used</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "totalPages",
            "description": "<p>Total number of pages.</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "pagingCounter",
            "description": "<p>The starting sl. number of first document.</p>"
          },
          {
            "group": "Paged format",
            "type": "Boolean",
            "optional": false,
            "field": "hasPrevPage",
            "description": "<p>Availability of prev page.</p>"
          },
          {
            "group": "Paged format",
            "type": "Boolean",
            "optional": false,
            "field": "hasNextPage",
            "description": "<p>Availability of next page.</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "prevPage",
            "description": "<p>Previous page number if available or NULL</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "nextPage",
            "description": "<p>Next page number if available or NULL</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": {\n        \"docs\": [\n            {\n                \"_id\": \"ACCSEH\",\n                \"name\": \"Accesorios (SEH)\",\n                \"started\": \"2020-04-21T20:25:10.395Z\",\n                \"countKeys\": 26\n            }\n        ],\n        \"totalDocs\": 1,\n        \"limit\": 20,\n        \"totalPages\": 1,\n        \"page\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
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
            "field": "Bad_Request",
            "description": "<p>Request not contains data</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Concflict",
            "description": "<p>An internal error ocurred</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>Server didn´t find request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Bad_Request-Response:",
          "content": "HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent params\"\n}",
          "type": "json"
        },
        {
          "title": "Conflict-Response:",
          "content": "HTTP/1.1 406 Indicates that the request could not be processed because of conflict in the current state of the resource\n{\n    \"message\": \"Internal error, probably error with params\"\n}",
          "type": "json"
        },
        {
          "title": "Not_Found-Response:",
          "content": "HTTP/1.1 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.\n{\n    \"message\": \"Document not found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/line",
    "title": "Save Line",
    "name": "SaveLine",
    "description": "<p>Save Line in the database</p>",
    "group": "Line",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>This function is restricted for logged in users.</p>"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/line",
        "type": "url"
      }
    ],
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "Line",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Line identifier</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Line name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"_id\": \"ACCSEH\",\n    \"name\": \"Accesorios (SEH)\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Line identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Line name</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "started",
            "description": "<p>Line creation date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": {\n        \"_id\": \"ACCSEH\",\n        \"name\": \"Accesorios (SEH)\",\n        \"started\": \"2020-04-21T20:25:10.395Z\",\n        \"__v\": 0\n    }\n}",
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
            "field": "Bad_Request",
            "description": "<p>Request not contains data</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Concflict",
            "description": "<p>An internal error ocurred</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_Content",
            "description": "<p>Couldn´t return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Bad_Request-Response:",
          "content": "HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent params\"\n}",
          "type": "json"
        },
        {
          "title": "Conflict-Response:",
          "content": "HTTP/1.1 406 Indicates that the request could not be processed because of conflict in the current state of the resource\n{\n    \"message\": \"Internal error, probably error with params\"\n}",
          "type": "json"
        },
        {
          "title": "No_Content-Response:",
          "content": "HTTP/1.1 204 The server successfully processed the request and is not returning any content.\n{\n    \"message\": \"Saved and is not returning any content\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/line/:id",
    "title": "Get Line",
    "name": "getLine",
    "description": "<p>Return the Line document that matchs with the id</p>",
    "group": "Line",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>This function is restricted for logged in users.</p>"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/line/ACCSEH",
        "type": "url"
      }
    ],
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Line identifier.</p>"
          }
        ]
      }
    },
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "Line",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Line identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Line name</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "started",
            "description": "<p>Line creation date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": {\n        \"_id\": \"ACCSEH\",\n        \"name\": \"Accesorios (SEH)\",\n        \"started\": \"2020-04-21T20:25:10.395Z\",\n        \"__v\": 0\n    }\n}",
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
            "field": "Bad_Request",
            "description": "<p>Request not contains data</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Concflict",
            "description": "<p>An internal error ocurred</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>Server didn´t find request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Bad_Request-Response:",
          "content": "HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent params\"\n}",
          "type": "json"
        },
        {
          "title": "Conflict-Response:",
          "content": "HTTP/1.1 406 Indicates that the request could not be processed because of conflict in the current state of the resource\n{\n    \"message\": \"Internal error, probably error with params\"\n}",
          "type": "json"
        },
        {
          "title": "Not_Found-Response:",
          "content": "HTTP/1.1 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.\n{\n    \"message\": \"Document not found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/line/page/:page",
    "title": "List Line Page",
    "name": "listLinePage",
    "description": "<p>Show all Line documents with the paged format</p>",
    "group": "Line",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>This function is restricted for logged in users.</p>"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/line/page/1",
        "type": "url"
      }
    ],
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "Line",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "number",
            "optional": false,
            "field": "page",
            "description": "<p>Number of page.</p>"
          }
        ],
        "Success 200 [Array]": [
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Line identifier</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Line name</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "Date",
            "optional": false,
            "field": "started",
            "description": "<p>Line creation date</p>"
          }
        ],
        "Paged format": [
          {
            "group": "Paged format",
            "type": "Array",
            "optional": false,
            "field": "docs",
            "description": "<p>Array of Line Documents</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "totalDocs",
            "description": "<p>Total number of documents in collection that match a query</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit that was used</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "totalPages",
            "description": "<p>Total number of pages.</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "pagingCounter",
            "description": "<p>The starting sl. number of first document.</p>"
          },
          {
            "group": "Paged format",
            "type": "Boolean",
            "optional": false,
            "field": "hasPrevPage",
            "description": "<p>Availability of prev page.</p>"
          },
          {
            "group": "Paged format",
            "type": "Boolean",
            "optional": false,
            "field": "hasNextPage",
            "description": "<p>Availability of next page.</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "prevPage",
            "description": "<p>Previous page number if available or NULL</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "nextPage",
            "description": "<p>Next page number if available or NULL</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": {\n        \"docs\": [\n            {\n                \"_id\": \"ACCSEH\",\n                \"name\": \"Accesorios (SEH)\",\n                \"started\": \"2020-04-21T20:25:10.395Z\",\n            }\n        ],\n        \"totalDocs\": 1,\n        \"limit\": 20,\n        \"totalPages\": 1,\n        \"page\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
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
            "field": "Bad_Request",
            "description": "<p>Request not contains data</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Concflict",
            "description": "<p>An internal error ocurred</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>Server didn´t find request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Bad_Request-Response:",
          "content": "HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent params\"\n}",
          "type": "json"
        },
        {
          "title": "Conflict-Response:",
          "content": "HTTP/1.1 406 Indicates that the request could not be processed because of conflict in the current state of the resource\n{\n    \"message\": \"Internal error, probably error with params\"\n}",
          "type": "json"
        },
        {
          "title": "Not_Found-Response:",
          "content": "HTTP/1.1 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.\n{\n    \"message\": \"Document not found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/line/regex/:id",
    "title": "List Line Regex",
    "name": "listLineRegex",
    "description": "<p>Show all Line documents found with the regex</p>",
    "group": "Line",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>This function is restricted for logged in users.</p>"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/line/regex/ACC",
        "type": "url"
      }
    ],
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "Line",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Regular expression that matches the start.</p>"
          }
        ],
        "Success 200 [Array]": [
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Line identifier</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Line name</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "Date",
            "optional": false,
            "field": "started",
            "description": "<p>Line creation date</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": [   \n        {\n            \"_id\": \"ACCSEH\",\n            \"name\": \"Accesorios (SEH)\",\n            \"started\": \"2020-04-21T20:25:10.395Z\",\n            \"__v\": 0\n        }\n    ]\n}",
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
            "field": "Bad_Request",
            "description": "<p>Request not contains data</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Concflict",
            "description": "<p>An internal error ocurred</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>Server didn´t find request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Bad_Request-Response:",
          "content": "HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent params\"\n}",
          "type": "json"
        },
        {
          "title": "Conflict-Response:",
          "content": "HTTP/1.1 406 Indicates that the request could not be processed because of conflict in the current state of the resource\n{\n    \"message\": \"Internal error, probably error with params\"\n}",
          "type": "json"
        },
        {
          "title": "Not_Found-Response:",
          "content": "HTTP/1.1 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.\n{\n    \"message\": \"Document not found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/line/regex/:id/page/:page",
    "title": "List Line Regex Page",
    "name": "listLineRegexPage",
    "description": "<p>Show all Line documents found with the regex with the paged format</p>",
    "group": "Line",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>This function is restricted for logged in users.</p>"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/line/regex/ACC/page/1",
        "type": "url"
      }
    ],
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "Line",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Regular expression that matches the start.</p>"
          },
          {
            "group": "params",
            "type": "number",
            "optional": false,
            "field": "page",
            "description": "<p>Number of page.</p>"
          }
        ],
        "Success 200 [Array]": [
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Line identifier</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Line name</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "Date",
            "optional": false,
            "field": "started",
            "description": "<p>Line creation date</p>"
          }
        ],
        "Paged format": [
          {
            "group": "Paged format",
            "type": "Array",
            "optional": false,
            "field": "docs",
            "description": "<p>Array of Line Documents</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "totalDocs",
            "description": "<p>Total number of documents in collection that match a query</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit that was used</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "totalPages",
            "description": "<p>Total number of pages.</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "pagingCounter",
            "description": "<p>The starting sl. number of first document.</p>"
          },
          {
            "group": "Paged format",
            "type": "Boolean",
            "optional": false,
            "field": "hasPrevPage",
            "description": "<p>Availability of prev page.</p>"
          },
          {
            "group": "Paged format",
            "type": "Boolean",
            "optional": false,
            "field": "hasNextPage",
            "description": "<p>Availability of next page.</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "prevPage",
            "description": "<p>Previous page number if available or NULL</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "nextPage",
            "description": "<p>Next page number if available or NULL</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": {\n        \"docs\": [\n            {\n                \"_id\": \"ACCSEH\",\n                \"name\": \"Accesorios (SEH)\",\n                \"started\": \"2020-04-21T20:25:10.395Z\",\n            }\n        ],\n        \"totalDocs\": 1,\n        \"limit\": 20,\n        \"totalPages\": 1,\n        \"page\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
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
            "field": "Bad_Request",
            "description": "<p>Request not contains data</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Concflict",
            "description": "<p>An internal error ocurred</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>Server didn´t find request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Bad_Request-Response:",
          "content": "HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent params\"\n}",
          "type": "json"
        },
        {
          "title": "Conflict-Response:",
          "content": "HTTP/1.1 406 Indicates that the request could not be processed because of conflict in the current state of the resource\n{\n    \"message\": \"Internal error, probably error with params\"\n}",
          "type": "json"
        },
        {
          "title": "Not_Found-Response:",
          "content": "HTTP/1.1 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.\n{\n    \"message\": \"Document not found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/line/total/key/regex/:id",
    "title": "List Line Key Regex",
    "name": "listLineTotalKeyRegex",
    "description": "<p>Show all Line documents found with the regex adding the total of Keys that belong to the line</p>",
    "group": "Line",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>This function is restricted for logged in users.</p>"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/line/total/key/regex/ACC",
        "type": "url"
      }
    ],
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "Line",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Regular expression that matches the start.</p>"
          }
        ],
        "Success 200 [Array]": [
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Line identifier</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Line name</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "Date",
            "optional": false,
            "field": "started",
            "description": "<p>Line creation date</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "Number",
            "optional": false,
            "field": "countKeys",
            "description": "<p>Total Key in Line</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": [\n        {\n            \"_id\": \"ACCSEH\",\n            \"name\": \"Accesorios (SEH)\",\n            \"started\": \"2020-04-21T20:25:10.395Z\",\n            \"countKeys\": 26\n        }\n    ]\n}",
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
            "field": "Bad_Request",
            "description": "<p>Request not contains data</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Concflict",
            "description": "<p>An internal error ocurred</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>Server didn´t find request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Bad_Request-Response:",
          "content": "HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent params\"\n}",
          "type": "json"
        },
        {
          "title": "Conflict-Response:",
          "content": "HTTP/1.1 406 Indicates that the request could not be processed because of conflict in the current state of the resource\n{\n    \"message\": \"Internal error, probably error with params\"\n}",
          "type": "json"
        },
        {
          "title": "Not_Found-Response:",
          "content": "HTTP/1.1 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.\n{\n    \"message\": \"Document not found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/line/total/key/regex/:id/page/:page",
    "title": "List Line Key Regex Page",
    "name": "listLineTotalKeyRegexPage",
    "description": "<p>Show all Line documents found with the regex  adding the total of Keys that belong to the line with the paged format</p>",
    "group": "Line",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>This function is restricted for logged in users.</p>"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/line/total/key/regex/ACC/page/1",
        "type": "url"
      }
    ],
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "Line",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Regular expression that matches the start.</p>"
          },
          {
            "group": "params",
            "type": "number",
            "optional": false,
            "field": "page",
            "description": "<p>Number of page.</p>"
          }
        ],
        "Success 200 [Array]": [
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Line identifier</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Line name</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "Date",
            "optional": false,
            "field": "started",
            "description": "<p>Line creation date</p>"
          },
          {
            "group": "Success 200 [Array]",
            "type": "Number",
            "optional": false,
            "field": "countKeys",
            "description": "<p>Total Key in Line</p>"
          }
        ],
        "Paged format": [
          {
            "group": "Paged format",
            "type": "Array",
            "optional": false,
            "field": "docs",
            "description": "<p>Array of Line Documents</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "totalDocs",
            "description": "<p>Total number of documents in collection that match a query</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit that was used</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "totalPages",
            "description": "<p>Total number of pages.</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Current page number</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "pagingCounter",
            "description": "<p>The starting sl. number of first document.</p>"
          },
          {
            "group": "Paged format",
            "type": "Boolean",
            "optional": false,
            "field": "hasPrevPage",
            "description": "<p>Availability of prev page.</p>"
          },
          {
            "group": "Paged format",
            "type": "Boolean",
            "optional": false,
            "field": "hasNextPage",
            "description": "<p>Availability of next page.</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "prevPage",
            "description": "<p>Previous page number if available or NULL</p>"
          },
          {
            "group": "Paged format",
            "type": "Number",
            "optional": false,
            "field": "nextPage",
            "description": "<p>Next page number if available or NULL</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": {\n        \"docs\": [\n            {\n                \"_id\": \"ACCSEH\",\n                \"name\": \"Accesorios (SEH)\",\n                \"started\": \"2020-04-21T20:25:10.395Z\",\n                \"countKeys\": 26\n            }\n        ],\n        \"totalDocs\": 1,\n        \"limit\": 20,\n        \"totalPages\": 1,\n        \"page\": 1,\n        \"pagingCounter\": 1,\n        \"hasPrevPage\": false,\n        \"hasNextPage\": false,\n        \"prevPage\": null,\n        \"nextPage\": null\n    }\n}",
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
            "field": "Bad_Request",
            "description": "<p>Request not contains data</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Concflict",
            "description": "<p>An internal error ocurred</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>Server didn´t find request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Bad_Request-Response:",
          "content": "HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent params\"\n}",
          "type": "json"
        },
        {
          "title": "Conflict-Response:",
          "content": "HTTP/1.1 406 Indicates that the request could not be processed because of conflict in the current state of the resource\n{\n    \"message\": \"Internal error, probably error with params\"\n}",
          "type": "json"
        },
        {
          "title": "Not_Found-Response:",
          "content": "HTTP/1.1 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.\n{\n    \"message\": \"Document not found\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/line/:id",
    "title": "Update Line",
    "name": "updateLine",
    "description": "<p>Update the line in id and returns the Line before the update</p>",
    "group": "Line",
    "version": "0.1.0",
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>This function is restricted for logged in users.</p>"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "http://localhost:4000/api/line/ACCSEH",
        "type": "url"
      }
    ],
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Line identifier.</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Line identifier</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Line name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"_id\": \"ACCSEH\",\n    \"name\": \"Accesorios (SEH)\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/api.routes.ts",
    "groupTitle": "Line",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Line identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Line name</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "started",
            "description": "<p>Line creation date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"data\": {\n        \"_id\": \"ACCSEH\",\n        \"name\": \"Accesorios (SEH)\",\n        \"started\": \"2020-04-21T20:25:10.395Z\",\n        \"__v\": 0\n    }\n}",
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
            "field": "Bad_Request",
            "description": "<p>Request not contains data</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Concflict",
            "description": "<p>An internal error ocurred</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>Server didn´t find request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_Content",
            "description": "<p>Couldn´t return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Bad_Request-Response:",
          "content": "HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent params\"\n}",
          "type": "json"
        },
        {
          "title": "Conflict-Response:",
          "content": "HTTP/1.1 406 Indicates that the request could not be processed because of conflict in the current state of the resource\n{\n    \"message\": \"Internal error, probably error with params\"\n}",
          "type": "json"
        },
        {
          "title": "Not_Found-Response:",
          "content": "HTTP/1.1 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.\n{\n    \"message\": \"Document not found\"\n}",
          "type": "json"
        },
        {
          "title": "No_Content-Response:",
          "content": "HTTP/1.1 204 The server successfully processed the request and is not returning any content.\n{\n    \"message\": \"Saved and is not returning any content\"\n}",
          "type": "json"
        }
      ]
    }
  },
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
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCI8.eyJzdWIiOiI1ZTZiZWVmMWNmNjI3OTVkZTBlMWU3OTEiLCJuaWNrbmFtZSI6InBhZHJvY2hhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg4MzkxNTUxLCJleHAiOjE1OTA5ODM1NTF9.kXECNDTfHt6yMdpR__InB6wu0Z8FKs8083mBnyVVaWg\"\n}",
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
            "field": "Bad_Request",
            "description": "<p>Request not contains data</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Concflict",
            "description": "<p>An internal error ocurred</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not_Found",
            "description": "<p>Server didn´t find request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Bad_Request-Response:",
          "content": "HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent params\"\n}",
          "type": "json"
        },
        {
          "title": "Conflict-Response:",
          "content": "HTTP/1.1 406 Indicates that the request could not be processed because of conflict in the current state of the resource\n{\n    \"message\": \"Internal error, probably error with params\"\n}",
          "type": "json"
        },
        {
          "title": "Not_Found-Response:",
          "content": "HTTP/1.1 404 The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.\n{\n    \"message\": \"Document not found\"\n}",
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
    "permission": [
      {
        "name": "admin",
        "title": "Admin access only",
        "description": "<p>This function is restricted for administrators.</p>"
      }
    ],
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
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCI8.eyJzdWIiOiI1ZTZiZWVmMWNmNjI3OTVkZTBlMWU3OTEiLCJuaWNrbmFtZSI6InBhZHJvY2hhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg4MzkxNTUxLCJleHAiOjE1OTA5ODM1NTF9.kXECNDTfHt6yMdpR__InB6wu0Z8FKs8083mBnyVVaWg\"\n}",
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
            "field": "Bad_Request",
            "description": "<p>Request not contains data</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Concflict",
            "description": "<p>An internal error ocurred</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "No_Content",
            "description": "<p>Couldn´t return</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Bad_Request-Response:",
          "content": "HTTP/1.1 400 The server cannot or will not process the request due to an apparent client error.\n{\n    \"message\": \"Client has not sent params\"\n}",
          "type": "json"
        },
        {
          "title": "Conflict-Response:",
          "content": "HTTP/1.1 406 Indicates that the request could not be processed because of conflict in the current state of the resource\n{\n    \"message\": \"Internal error, probably error with params\"\n}",
          "type": "json"
        },
        {
          "title": "No_Content-Response:",
          "content": "HTTP/1.1 204 The server successfully processed the request and is not returning any content.\n{\n    \"message\": \"Saved and is not returning any content\"\n}",
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
    "permission": [
      {
        "name": "user",
        "title": "User access only",
        "description": "<p>This function is restricted for logged in users.</p>"
      }
    ],
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
