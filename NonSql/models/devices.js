var mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
  device_id : {type : String, required: true},
  location : {type : String},
  description : {type : String},
});

deviceSchema.statics.findDevice = function(req, res, next){
  mongoose.model('Device').findOne({device_id: req.body.device_id || req.params.device_id}, function(err, device){
    if(err){
      next(err);
    } else {
      req.device = device;
      next();
    }
  });
}

module.exports = mongoose.model('Device', deviceSchema);
