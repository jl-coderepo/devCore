const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();

connectDB();

// Initializing middleware(s)
app.use(express.json({ extended: true }));

// app.get("/", (req, res) => res.send("API Running"));

//Enabling cors for all origins
// app.use(cors());

// Defining api routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

//Serving static assets in production
if (process.env.NODE_ENV === "production") {
  console.log(" __SANITY CHECK: 1");
  app.use(express.static("/dist"));
  console.log(" __SANITY CHECK: 2");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
  console.log(" __SANITY CHECK: 3");
}
// //remove later
// else {
//   console.log(" __SANITY CHECK: 1");
//   app.use(express.static(path.join(__dirname, "../client/dist")));
//   console.log(" __SANITY CHECK: 2");
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
//   });
//   console.log(" __SANITY CHECK: 3");
// }

// When using heroku (or another host) PORT will check
// 'process.env.PORT' to find suitable port, local development
// uses port 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`  __SERVER: server started on port ${PORT}`)
);
