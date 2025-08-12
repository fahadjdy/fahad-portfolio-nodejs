const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const db = require("./models/index"); // mysql2 pool

dotenv.config();

const app = express();

// CORS setup
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/fahad-jadiya", require("./routes/routes"));

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
