const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',  
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API for managing clients, users, and admin operations',
      },
      servers: [
        {
          url: 'http://localhost:8089',
          description: 'Local server',
        },
         
      ],
       components: {
          securitySchemes: {
              bearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT', // Optional: indicates token format
              },
          },
      },
      security: [
          {
              bearerAuth: [], // Applies Bearer authentication globally
          },
      ],
    },
    
    apis: ['./documentation/*.js'],  
  };
   
const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
