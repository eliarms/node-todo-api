var express = require('express')
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose');
var {Todo} = require ('./models/todo')
var {User} = require ('./models/user');
var {logger} = require ('./logger/mongo-logger');

var app = express();
app.use(bodyParser.json());
app.use(logger);
app.post('/todos', (req,res)=>{
  var todo = new Todo ({
    text: req.body.text
  });
  //save todo
  todo.save().then((doc) =>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });

//get all todos
  app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
      res.send({todos});
    },(e)=>{
      res.status(400).send(e);
    })
  });
  console.log(req.body);

});
app.listen(3000,()=>{
  console.log('Started on port 3000');
});
