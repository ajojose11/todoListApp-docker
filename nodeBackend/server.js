const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('./database'); 
const users = require('./routes/users');
const tasks = require('./routes/tasks');
const api = require('./routes/api');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// connection to mongodb
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  mongoose.connect("mongodb://database:27017/nodeApi", options).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry();

app.get('/', function(req, res){
    res.json({"/users/register": "for creating new users",
              "/users/login": "to login"
            });
   });
app.use('/api', api);
app.use('/users',users);
app.use('/api/tasks', tasks);


const port = 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});