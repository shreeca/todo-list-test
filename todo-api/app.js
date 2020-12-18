const express = require('express');
const path = require('path');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const dbConnStr = 'mongodb+srv://todoListDbUser:todoListDbUser123@cluster0.bh8t6.mongodb.net/todoList?retryWrites=true&w=majority';

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users/users');


let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(dbConnStr, { useUnifiedTopology: true })
    .then(client => {

        console.log('database connected!')

        const db = client.db('toDoList');
        const usersCollection = db.collection('users');

        app.use('/users', usersRouter(usersCollection));
    })
    .catch(error => console.error(error))


app.use('/', indexRouter);


module.exports = app;