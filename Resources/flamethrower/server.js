var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.lastPlayerID = 0;

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});

io.on('connection',function(socket){

    socket.on('newplayer',function(){
        socket.player = {
            id: socket.id,
            x: randomInt(50,1000),
            y: randomInt(50,1000),
            velocity: {
                x:0,
                y:0
            },
            target:{
                x:0,
                y:0
            }
        };
        console.log(socket.player);
        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);


        socket.on('moveme',function(data){
            socket.player.x = data.location.x;
            socket.player.y = data.location.y;
            socket.player.velocity.x = data.velocity.x;
            socket.player.velocity.y = data.velocity.y;
            io.emit('move',socket.player);
        });

        socket.on('snapTo',function(data){
            socket.player.x = data.x;
            socket.player.y = data.y;
            io.emit('snapTo',socket.player);
        });

        socket.on('targetPlayer',function(data){
            socket.player.target.x = data.x;
            socket.player.target.y = data.y;
            io.emit('fireWeapon',socket.player);
        });

        socket.on('disconnect',function(){
            io.emit('remove',socket.player.id);
        });
    });

    socket.on('test',function(){
        console.log('test received');
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
