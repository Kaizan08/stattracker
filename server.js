const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Activity = require("./models/Activity");
const checkAuth = require("./checkAuth");
const app = express();
var path = require("path");
const port = process.env.PORT || 8000;
const dbUrl = "mongodb://localhost:27017/stattrack";
const index = require("./routes/index")
const api = require("./routes/api")
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", index);
app.use("/api", checkAuth, api);

mongoose.connect(dbUrl).then(function(err, db){
    if (err){console.log("error", err)}
    console.log("Connected to stattracker DB.");
});

app.listen(port, ()=>{
    console.log('Server running on port', port);
});

module.exports = app;


