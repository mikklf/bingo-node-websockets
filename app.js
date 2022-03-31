var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
const fs = require('fs');
var connections = []

app.use(express.static(__dirname + '/assets'));

server.listen(process.env.PORT || 8080);
console.log('Server running on port: ' + server.address().port);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/kontrol', function(req, res){
    res.sendFile(__dirname + '/public/kontrol.html');
});


const Bingo = require('./bingo');
var game = new Bingo

io.sockets.on('connection', function(socket){
    // Connect
    connections.push(socket);
    console.log('[+] Connected (%s total)', connections.length);
    io.sockets.emit('connected', game.getData()) // Send client, board infomation

    // Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('[-] Disconnected (%s total)', connections.length);
    });

    // Next number
    socket.on('next number', function(data){
        if(game.hasNumbersLeft()) {
            game.nextNumber()
            io.sockets.emit('new number', game.getData())
        } else {
            return false
        }       
    });

    // Reset game
    socket.on('reset game', function(data){
        game = new Bingo
        io.sockets.emit('reset table', game.getData())
    });
});