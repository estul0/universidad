var socket = io.connect('http://localhost:3000', { 'forceNew': true });
var username = '';
var chatRooms = {
    'home': new Array,
    'wat': new Array
};
var room = 'home';

socket.on('messages', function(data, broadcastingRoom) {
    if (username == '') {
        username = data[0].username;
    }
    if( broadcastingRoom == room) {
        chatRooms[room].push(data[data.length-1]);
        render(chatRooms[room]);
    }
});

function render(data) {
    var html = data.map(function(elem, index) {
        return(`<div>
                    <strong>${elem.author}</strong>
                    <em>${elem.text}</em>
                </div>`);
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    userInputText = document.getElementById('texto').value;
    if (userInputText.indexOf('/') == 0) {
        commands = userInputText.split(' ');
        let nickIndex = commands.indexOf('/nick');
        let roomIndex = commands.indexOf('/room');
        let createIndex = commands.indexOf('/create');
        if (nickIndex != -1) {
            console.log(nickIndex)
            let oldUsr = username;
            username = commands[nickIndex+1];
            message = {
                author: oldUsr,
                text: 'I am changing my nickname to: ' + username + '!'
            };
            socket.emit('new-message', room, message);
        }
        if (roomIndex != -1) {
            let tryRoom = commands[roomIndex+1];
            socket.emit('check-room', tryRoom);
            socket.on('room-checked', function(exists) {
                if (exists) {
                    room = tryRoom;
                    message = {
                        author: username,
                        text: 'Hello chat!'
                    };
                    socket.emit('new-message', room, message)
                } else {
                    message = {
                        author: username,
                        text: 'This chat room does not exist.'
                    };
                    chatRooms[room].push(message);
                    render(chatRooms[room])
                }
            });
        }
        if (createIndex != -1) {
            let tryRoom = commands[createIndex+1];
            socket.emit('check-room', tryRoom);
            socket.on('room-checked', function(exists) {
                if (!exists) {
                    room = tryRoom;
                    chatRooms[room] = new Array;
                    message = {
                        author: username,
                        text: 'Let there be light'
                    };
                    socket.emit('new-room', room, message)
                } else {
                    message = {
                        author: 'System',
                        text: 'This chat room already exists.'
                    };
                    chatRooms[room].push(message);
                    render(chatRooms[room])
                }
            }); 
        }
    } else {
        var message = {
            author: username,
            text: userInputText
        };
        console.log('emitting new message');
        socket.emit('new-message', room, message);
    }
    return false;
}