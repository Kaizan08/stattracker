var express = require("express");
var router = express.Router();

const Activity = require("../models/Activity");

router.get("/activities", (req, res)=>{
    Activity.find().then(foundActivities=>{
        res.json(foundActivities);
    }).catch(err=>{
        res.status(500).send(err);
    });
})

router.post("/activities", (req, res)=>{
    var obj = req.body;
    console.log(obj);
    let newActivity = new Activity(obj);
    newActivity.save().then(savedActivity=>{
        res.json(savedActivity);
    }).catch(err=>{
        res.status(500).send(err);
    });
})

router.get("/activities/:id", (req, res)=>{
    Activity.findById(req.params.id).then(foundActivities=>{
        res.json(foundActivities);
    }).catch(err=>{
        res.status(500).send(err);
    });
})

router.put("/activities/:id", (req, res)=>{
    Activity.findOneAndUpdate({ _id: req.params.id }, req.body).then(updatedActivity => {
        res.json(updatedActivity);
    }).catch(err=>{
        res.status(500).send(err);
    });
})

router.delete("/activities/:id", (req, res) => {
  Activity.deleteOne({ _id: req.params.id })
    .then(() => {
      res.send("Deleted record");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});
//{ "date":"2017-03-27", "value": 10}
router.post("/activities/:id/stats", (req, res) => {
    Activity.findById({ _id: req.params.id}).then( row =>{
        row.stats.push(req.body);
        row.save().then(output =>{
            res.json(output);
        })
    }).catch(err=>{
        res.status(500).send(err);
    })
});

//pass across {
	// "date": "2017-03-27T00:00:00.000Z"
	// }
//check if only ID of the activity or subdocument
router.delete("/activities/stats/:id", (req, res) => {
    Activity.findByIdAndUpdate(req.params.id,{ "$pull": { "stats": { "date":req.body.date } } }).then( row =>{
            res.json(row);
        }).catch(err=>{
        res.status(500).send(err);
    });
})
module.exports = router;