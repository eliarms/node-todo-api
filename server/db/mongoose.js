var mongoose = require('mongoose');
//initate the connection string
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true });
  //Instantiate the TodoApp DB
//var db = client.db('TodoApp');

module.exports ={mongoose};
