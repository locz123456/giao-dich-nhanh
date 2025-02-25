const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { CONNECT_DB } = require('./config/database')
const { corsOptions } = require('./config/cors')
const exitHook = require('async-exit-hook')
const cookieParser = require("cookie-parser");
dotenv.config();

// Kết nối MongoDB
CONNECT_DB()

const app = express()

app.use(cookieParser());
app.use(express.json())
app.use(cors(corsOptions))

// Import routes
const userRoutes = require('./routes/userRoutes')
app.use('/api', userRoutes)

const productRoutes = require('./routes/productRoutes')
app.use('/api', productRoutes)

const reviewRoutes = require('./routes/reviewRoutes')
app.use('/api', reviewRoutes)

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`)
});

exitHook(() => {
    console.log(`Exit app`)
})

