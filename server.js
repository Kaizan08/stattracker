const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Activity = require("./models/Activity");
const app = express();
const port = process.env.PORT || 8000;
const dbUrl = "mongodb://localhost:27017/stattrack";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(dbUrl).then(function(err, db){
    if (err){console.log("error", err)}
    console.log("Connected to stattracker DB.");
});

app.get("/api/activities", (req, res)=>{
    Activity.find().then(foundActivities=>{
        res.send(foundActivities);
    }).catch(err=>{
        res.status(500).send(err);
    });
})

app.post("/api/activities", (req, res)=>{
    var obj = req.body;
    console.log(obj);
    let newActivity = new Activity(obj);
    newActivity.save().then(savedActivity=>{
        res.send(savedActivity);
    }).catch(err=>{
        res.status(500).send(err);
    });
})

app.get("/api/activities/:id", (req, res)=>{
    Activity.findById(req.params.id).then(foundActivities=>{
        res.send(foundActivities);
    }).catch(err=>{
        res.status(500).send(err);
    });
})

app.put("/api/activities/:id", (req, res)=>{
    Activity.findOneAndUpdate({ _id: req.params.id }, req.body).then(updatedActivity => {
        res.send(updatedActivity);
    }).catch(err=>{
        res.status(500).send(err);
    });
})

app.delete("/api/activities/:id", (req, res) => {
  Activity.deleteOne({ _id: req.params.id })
    .then(() => {
      res.send("Deleted record");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});
//{ "date":"2017-03-27", "value": 10}
app.post("/api/activities/:id/stats", (req, res) => {
    Activity.findById({ _id: req.params.id}).then( row =>{
        row.stats.push(req.body);
        row.save().then(output =>{
            res.send(output);
        })
    }).catch(err=>{
        res.status(500).send(err);
    })
});

//pass across {
	// "date": "2017-03-27T00:00:00.000Z"
	// }
//check if only ID of the activity or subdocument
app.delete("/api/activities/stats/:id", (req, res) => {
    Activity.findByIdAndUpdate(req.params.id,{ "$pull": { "stats": { "date":req.body.date } } }).then( row =>{
            res.send(row);
        }).catch(err=>{
        res.status(500).send(err);
    });
})

app.listen(port, ()=>{
    console.log('Server running on port', port);
});