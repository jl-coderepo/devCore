const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

// Initializing middleware(s)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Defining api routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

// When using heroku (or another host) PORT will check
// 'process.env.PORT' to find suitable port, local development
// uses port 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`  __SERVER: server started on port ${PORT}`)
);
