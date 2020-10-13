
 var express = require('express');
 var app = express();
 var server = require('http').Server(app);
 var io = require('socket.io')(server);
 var argv = require('minimist')(process.argv.slice(2));
 var five = require("johnny-five");
 var fs = require('fs');
 var math = require('mathjs');

 app.use('/', express.static(__dirname + '/site'));
app.set('view engine', 'ejs');
var port = process.env.PORT || 8080;
server.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});

app.get('/calibrate', function(req, res) {
    res.render('calibrate');
});

io.on('connection', function (socket) {
    socket.emit('client info?');
  
    socket.on('client info!', function (data) {
      console.log("client info:", data);
      if (data.hasOwnProperty('type')) {
        if (data.type === 'calibrate') {
        //   robot.device = data;
        //   robot.device.socket = socket;
        } else if (data.type === 'simulator') {
        //   robot.simulator = data;
        //   robot.simulator.socket = socket;
        }
      }
    });
    
  
    socket.on('screen touch!', function (data) {
      console.log("screen touch:", data);
      robot.screenTouched = true;
      robot.touchLocation = data;
    });

});