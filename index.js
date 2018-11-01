let app = require( 'express' )();
let http = require( 'http' ).Server( app );
let io = require( 'socket.io' )( http );

app.get( '/', function (req, res) {
    res.sendFile( __dirname + '/index.html' )
} );

let userId = 0;
io.on( 'connection', function (socket) {
    const user = userId++;
    io.emit( 'chat message', `The user ${user} is connected!` );
    
    socket.on( 'disconnect', function () {
        io.emit( 'chat message', `The user ${user} is disconnected!` );
    } );
    socket.on( 'chat message', function (msg) {
        io.emit( 'chat message', { user, msg } );
    } );
} );

http.listen( 3000, function () {
    console.log( 'listening on *:3000' );
} );