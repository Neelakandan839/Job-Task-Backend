const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

// MongoDB 
mongoose
  .connect(
    "mongodb+srv://NK:nk123@cluster0.onale.mongodb.net/job-task?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(passportConfig.initialize());

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/Resumeupload"));
app.use("/host", require("./routes/ResumeDownload"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
