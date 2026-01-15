let express = require('express');
let app = express();
let cors = require('cors');
let configDotenv = require('dotenv');
configDotenv.config();
let connectDB = require('./config/connectDB');
const authRoutes = require('./routes/authRoutes');
connectDB();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cors());

app.use('/api', authRoutes);

app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)});