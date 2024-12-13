const express = require('express');
const { connectToDB } = require('./db');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = process.env.PORT || 8888;
const authRoutes = require('./routes/auth');
const hoKhauRoutes = require('./routes/hokhau');
const canHoRoutes = require('./routes/canho');
const hoaDonRoutes = require('./routes/hoadon');
const khoanThuRoutes = require('./routes/khoanthu');
const loaiXeRoutes = require('./routes/loaixe');
const khoanThuTheoHoRoutes = require('./routes/khoanthutheoho');
const tamVangRoutes = require('./routes/tamvang');

const cors = require('cors');

app.use(cors({ origin: process.env.BASE_URL || `http://localhost:${port}` }));
app.use(express.json());

// Kết nối MongoDB
connectToDB();

// Route cho đường dẫn gốc
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Sử dụng routes auth
app.use('/api/auth', authRoutes);

app.use('/api/ho-khau', hoKhauRoutes);
app.use('/api/can-ho', canHoRoutes);
app.use('/api/hoa-don', hoaDonRoutes);
app.use('/api/khoan-thu', khoanThuRoutes);
app.use('/api/loai-xe', loaiXeRoutes);
app.use('/api/khoan-thu-theo-ho', khoanThuTheoHoRoutes);
app.use('/api/tam-vang', tamVangRoutes);

// Cấu hình Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
    servers: [
      {
        url: process.env.BASE_URL || `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

// Swagger setup
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log('BASE_URL:', process.env.BASE_URL);
});
