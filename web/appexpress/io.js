const socket = require('socket.io');
const usernameGenerator = require('username-generator');

var chatRooms = {
    'home': new Array,
    'wat': new Array
};

chatRooms['home'].push({
    id: 1,
    text: "Welcome!",
    author: "estulo",
    username: ''
})

function startConnection(server) {
    var io = socket(server);

    io.on('connection', function(socket) {
        console.log('New connection to socket');
        let username = usernameGenerator.generateUsername();
        chatRooms['home'][0].username = username;
        socket.emit('messages', chatRooms['home'], 'home');

        socket.on('new-message', function(room, data) {
            chatRooms[room].push(data);
            io.sockets.emit('messages', chatRooms[room], room);
        }).on('check-room', function (room) {
            let exists = chatRooms[room] === undefined;
            socket.emit('room-checked', !exists);
        }).on('new-room', function (room, data) {
            chatRooms[room] = new Array;
            chatRooms[room].push(data);
            socket.emit('messages', chatRooms[room], room);
        });
    });
}

module.exports.startConnection = startConnection;