var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var activitySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    stats: [{
      date: {
        type: Date,
        required: true
      },
      value: {
        type: Number,
        required: true
      }
    }]
  },
  { strict: false }
);



module.exports = mongoose.model("Activity", activitySchema);
