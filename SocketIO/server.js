const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('./path/path');
const port = process.env.PORT || 3000;
const io = require('socket.io')(http);

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    //res.sendFile(path.index);
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);
    // lắng nghe sự kiện chat
    socket.on('chat', (user) => {
        // gửi lại message cho tất cả theo sự kiện response
        console.log(user);
        console.log(typeof(user));
        io.emit('response', user);
    });
    
        
    socket.on('disconnect', () => {
        console.log('a user disconnected: ' + socket.id);
    });
});

http.listen(port, () => {
    console.log(`listening on ${port}`);
});