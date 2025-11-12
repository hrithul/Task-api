export default {
  openapi: "3.0.3",
  info: {
    title: "Task API",
    version: "1.0.0",
    description: "OpenAPI documentation for the Task API",
  },
  servers: [
    {
      url: "http://localhost:{port}",
      variables: {
        port: {
          default: "3000",
        },
      },
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          token: { type: "string" },
        },
      },
      Task: {
        type: "object",
        properties: {
          _id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          status: { type: "string", enum: ["pending", "in_progress", "completed"] },
          user: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  password: { type: "string", format: "password" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered",
            content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } },
          },
          400: { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string", format: "password" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Logged in", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
          401: { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/api/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get current user",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Current user", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
          401: { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/api/tasks": {
      get: {
        tags: ["Tasks"],
        summary: "List tasks",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Tasks list", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Task" } } } } },
        },
      },
      post: {
        tags: ["Tasks"],
        summary: "Create task",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title"],
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Task created", content: { "application/json": { schema: { $ref: "#/components/schemas/Task" } } } },
        },
      },
    },
    "/api/tasks/{id}": {
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "string" } }
      ],
      put: {
        tags: ["Tasks"],
        summary: "Update task by id",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  status: { type: "string", enum: ["pending", "in_progress", "completed"] },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Task updated", content: { "application/json": { schema: { $ref: "#/components/schemas/Task" } } } },
        },
      },
      delete: {
        tags: ["Tasks"],
        summary: "Delete task by id",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Task deleted" },
        },
      },
    },
  },
};
