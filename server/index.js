
var PORT = process.env.PORT || 5000;
var express = require("express")
var app = express();



var http = require('http')
var server = http.Server(app)

app.use(express.static('client'));

const io = require('socket.io')(server)

io.on('connection', socket => {
    socket.on('message', ({name,message}) =>{
io.emit('message', {name,message})
    })
})


http.listen(4000, function() {
    console.log('listening on port 4000')
})






//// you need to build chess app , and deploy to firebase and you can deploy back end functions to firebase
//cloud functions

// so we you go to the www.yourchessapp.com you get the page present from firebase hosting server and 
//you get a game loaded from the firebase database

//then the clock comes off a seperate heroku server , 
//when we start game the clock time for each player is shared back and forth
//from socket io which is hosted on heroku, 