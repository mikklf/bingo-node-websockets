var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
const fs = require('fs');
connections = [];

app.use(express.static(__dirname + '/assets'));

server.listen(process.env.PORT || 3000);
console.log('Server running...');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/kontrol', function(req, res){
    res.sendFile(__dirname + '/kontrol.html');
});

// Tjek om der er gammel liste
if (fs.existsSync('numbers.txt') && fs.readFileSync('numbers.txt', 'utf8') != '') {
    var numbers = fs.readFileSync('numbers.txt', 'utf8').split(',');
    console.log("Numbers loaded from numbers.txt")
} else {
    var numbers = []
}

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected (%s sockets connected)', connections.length);
    io.sockets.emit('connected', {numbers})
    
    // Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected (%s sockets connected)', connections.length);
    });

    socket.on('next number', function(data){
        // Tjek antallet af nummer i listen
        if(numbers.length >= 75) {
            return false
        }

        // Tilfældigt tal som ikke findes i listen
        var done = false
        while (done == false) {
            var randNum = Math.floor((Math.random() * 75) + 1);
            if (!numbers.includes(randNum)) {
                numbers.push(randNum)
                io.sockets.emit('new number', {numbers})
                fs.writeFileSync('numbers.txt', numbers);
                done = true
            }
        }        
    });

    socket.on('reset game', function(data){
        numbers = []
        fs.writeFileSync('numbers.txt', '');
        io.sockets.emit('reset table', {numbers})
    });
});