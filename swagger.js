const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Week 1-2 API: CRUD Contacts',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
