// swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0", // Swagger version
    info: {
      title: "Document Versioning and Review Management API",
      version: "1.0.0",
      description: "API documentation for your Document Management System",
    },
    servers: [
      {
        url: "http://localhost:3000", 
      },
    ],
  },
  apis: ["./routes/route.js",
    "./routes/adminRoute.js",
    "./routes/reviewerRoute.js",
    "./routes/pdfRoutes.js"
  ], 
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
