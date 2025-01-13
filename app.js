const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors")
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const {connectDB} = require("./config/db")
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Test route is working!' });
});
// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API documentation for the Task Management backend',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Swagger middleware
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Error Handling
app.use(errorHandler);

// MongoDB Connection
// mongoose
//   .connect("mongodb+srv://dekalme:ELkDBx0q4lzorHPW@cluster0.gxj7w.mongodb.net/taskManager?retryWrites=true&w=majority&appName=Cluster0")
//   .then(() => console.log('MongoDB connected...'))
//   .catch((err) => console.error('MongoDB connection error:', err));
connectDB()
// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));