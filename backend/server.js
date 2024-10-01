const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');

const {connectDB} = require('./config/db.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
dotenv.config()

const port = process.env.PORT;

// Connect to MongoDB
connectDB();

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Allow sending cookies
};
app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/payment', paymentRoutes);

//-------------------------------------
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Any app route that is not an API route will be redirected to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
}

//-------------------------------------
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
