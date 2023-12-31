const mongoose=require('mongoose')

const UserSchema = new mongoose.Schema({
    Username: {
      type: String,
      required: [true, 'Username is required'],
      minlength: 4,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  
  const UserModel = mongoose.model('User', UserSchema);
  
  module.exports = UserModel;
  