const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  status: {type:Boolean},
  userId: {type:String},
  time:{type:Date}
});

const User = mongoose.model('DKUser', UserSchema);

function getUserDocument(req, res, next) {
  User.findOne({email: req.user.email}, (err, user) => {
     if (err || !user) {
         res.status('400').json({status: 'user-missing'});
     }
     req.userDocument = user;
     next();
  });
}


module.exports = { UserSchema, User, getUserDocument };