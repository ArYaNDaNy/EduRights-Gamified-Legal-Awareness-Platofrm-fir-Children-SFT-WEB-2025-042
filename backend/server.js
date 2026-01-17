let express = require('express');
let app = express();
let cors = require('cors');
let configDotenv = require('dotenv');
configDotenv.config();
let connectDB = require('./config/connectDB');
const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoute')
const adminRoute = require("./routes/adminRoutes")
connectDB();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cors());

app.use('/api', authRoutes);

app.use("/api/users", userRoute)

app.use("/api/admin",adminRoute)
console.log("loading users routes")
app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)});