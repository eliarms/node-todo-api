const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const  bcrypt = require('bcryptjs');


//User Schema
var UserSchema = new mongoose.Schema(

  {
    email:{
      type:String ,
      required:true,
      trim:true,
      minlength:1,
      unique:true,
      //validator function to validate user email
      validate:{
        validator :validator.isEmail,
        message: '{VALUE} is not a valid email'
  
      }
    },
    password: {
      type: String,
      required:true,
      minlength:6
  
    },
    tokens:[{
        access:{
          type: String,
          required:true
  
        },
        token:{
          type: String,
          required:true
  
        }
    }]
  
  }
);
//ovewrite the methods to remove sensitive information from the response object
UserSchema.methods.toJSON = function()
{
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['_id','email']);
  
};

// function to generate access token
UserSchema.methods.generateAuthToken = function () {
  var user = this;  
  var access = 'auth';
  //use jwt lib to create access token
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc12345').toString();

  user.tokens.push({access,token});

  return user.save().then(()=>{
    return token;
  });
};

UserSchema.statics.findByToken = function(token){

  var User = this;
  var decoded;
  try{
    decoded = jwt.verify(token,'abc12345');
  }
  catch (e){
    return Promise.reject();
  }
  
  return User.findOne({
    '_id': decoded._id,
    'tokens.token':token,
    'tokens.access': 'auth'
  })
};

//function to get user based on credentials
UserSchema.statics.findByCredentials = function (email,password){
  var User = this;
  //find user by email
 return User.findOne({email}).then((user) =>{
   if(!user){
     return Promise.reject();
   }
   return new Promise ((resolve,reject) =>{
    bcrypt.compare(password,user.password, (err,res) =>{
      if(res)
      {
        resolve(user);
      }
      else{
        reject();
      }
      });
   })

 });

};


// function to remove access token
UserSchema.methods.removeToken = function (token) {
  var user = this;  
  return user.update({
    $pull:{
      tokens:{token}
    }
  });
};




//Midlleware to perform some actions before saving user data 
UserSchema.pre('save', function(next){
var user = this;
//hash the password only if it is modified
if(user.isModified('password')){

  //integrate brcypt algorithm in the middleware to hash the password
  bcrypt.genSalt(15,(err,salt)=>
  {
      bcrypt.hash(user.password,salt,(err,hash) =>{
        user.password = hash;
        next();
      });
  });
}
else{
next();
}
});


var User = mongoose.model('User',UserSchema);

module.exports = {User}
