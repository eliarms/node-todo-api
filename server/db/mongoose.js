const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useCreateIndex: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;


var mongoose = require('mongoose');
//initate the connection string
mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/TodoApp',{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  //Instantiate the TodoApp DB
//var db = client.db('TodoApp');
mongoose.connect(url, options);
module.exports ={mongoose};

