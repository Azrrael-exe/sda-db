var mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
  name : {type : String, required: true},
  location : {type : String},
  description : {type : String},
  status : {type : String}
});

deviceSchema.statics.createDevice = function(req, next){

}


module.exports = mongoose.model('Device', deviceSchema);
