const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { CONNECT_DB } = require('../src/config/database')
const { corsOptions } = require('./config/cors')
const cookieParser = require("cookie-parser");
dotenv.config();

// Kết nối MongoDB
CONNECT_DB()

const app = express()

app.use(cookieParser());
app.use(express.json())
app.use(cors(corsOptions))

// Import routes
const userRoutes = require('./routes/userRouter')
app.use('/api', userRoutes)

const productRoutes = require('./routes/productRoutes')
app.use('/api', productRoutes)

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`)
});

