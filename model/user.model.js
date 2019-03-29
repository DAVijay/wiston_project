const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const stage = require('../config/database.config');


const UserSchema = mongoose.Schema({
    email: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
      },
      token:String,
    name: String,
    birthday: Date,
    gender: String 
}, {
    timestamps: true
});

// encrypt password before save
UserSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
      next();
    } else {
      bcrypt.hash(user.email, stage.development.saltingRounds, function(err, hash) {
        if (err) {
          console.log('Error hashing password for user', user.name);
          next(err);
        } else {
          user.token = hash;
          next();
        }
      });
    }
  });

module.exports = mongoose.model('User', UserSchema);
