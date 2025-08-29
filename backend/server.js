const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const db = require("./models/index"); // mysql2 pool

dotenv.config();

const app = express();

// CORS setup
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: false
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use("/fahad-jadiya", require("./routes"));

app.use('/public', express.static('public'));

// Test DB Connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("MySQL connected using mysql2/promise");
    connection.release(); // release connection back to pool
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
})();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



// .env 
// PORT=8889
// DB_HOST=192.168.100.46
// DB_USER=fahad
// DB_PASSWORD=d2Ip1E]WFmP*@]5t
// DB_NAME=fahad_portfolio
// JWT_SECRET=supersecretkey
