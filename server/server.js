var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {Todo} = require ('./models/todo')
var {User} = require ('./models/user');
var {logger} = require ('./logger/mongo-logger');

var app = express();
const port = process.env.PORT || 3000;
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
//  console.log(req.body);
});

//get all todos
  app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
      res.send({todos});
    },(e)=>{
      res.status(400).send(e);
    })
  });

  //GET/todos/ID

  app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
        //validate id using isvalid
    if(!ObjectID.isValid(id)){
      //404 - send back empty content
      return res.status(404).send('Invalid ID');
    }
    //findById
     //success
       // if todo - send it back
      // if no todo -send back 404 with empty body
    //error
     // 400 and send empty body back
    Todo.findById(id).then((todo)=>{
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    }).catch((e) =>{
      res.status(400).send();
    });

  });

app.listen(port,()=>{
  console.log(`Started on port ${port}`);
});
