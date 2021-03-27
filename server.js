const express = require('express') //We create a variable to store the 'express' module.
const app = express() //We create a variable to store the express function so that we can call it when we need to.
const bodyParser = require('body-parser')//We create a variable to store the body-parser module.
const MongoClient = require('mongodb').MongoClient//We create a variable to store the mongoDB module so that we can use MongoDB
var port     = process.env.PORT || 8080;

var db, 
  collection;

//This variable stores the url of our database.

const url = "mongodb+srv://anvytran:matcha@anvyrc.kuion.mongodb.net/toDoList?retryWrites=true&w=majority";

//This variable stores the mongoDB cluster name. 

var dbName = 'toDoList'

//The following function serves to connect us to our MongoDB database
 
app.listen(port, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

//The following function serves to set up express.js

app.set('view engine', 'ejs')//sets up engine to use ejs
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))//public folder which hold static assets

//The following function runs when the user visits the webpage.

app.get('/', (req, res) => {
  db.collection('tasks').find().toArray((err, result) => {

    db.collection('tasks').countDocuments({status:'inProgress'},
    (error, count) => {

      if (err) return console.log(err)
      res.render('index.ejs', {tasks: result, total: count})

    })
  })
})
  

//The following function runs when the user makes something.

app.post('/tasks', (req, res) => {
  db.collection('tasks').insertOne(
    
    {chore: req.body.chore, status:'inProgress'}, 
    
    (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
    
  })
})


//The following function runs when the user updates something.

app.put('/accomplished', (req, res) => {
  db.collection('tasks')
  .findOneAndUpdate({chore: req.body.chore}, {
    $set: {

      accomplish: true,
      status: 'completed'
      
    }

  }, {
    sort: {_id: -1},
    upsert: false
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})




//The following function runs when the user deletes something.

app.delete('/tasks', (req, res) => {
  db.collection('tasks').findOneAndDelete({chore: req.body.chore}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

// db.users.remove({'_id':{'$in':inactive_users}})

app.delete('/clearCompleted', (req, res) => {
  db.collection('tasks').deleteMany({accomplish: true}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})


app.delete('/deleteAll', (req, res) => {
  db.collection('tasks').deleteMany({}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
