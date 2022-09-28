var ZKLib = require("zklib");

ZK = new ZKLib({
  ip : "10.0.0.44", 
  port : 4370,
  inport : 5200
});

// connect to access control device
ZK.connect( function() {
    console.log("conectado")

  // read the time info from th device
  ZK.getTime( function(err, t) {
    console.log("Device clock's time is " + t.toString());
    
    // disconnect from the device
    ZK.disconnect();
  });
});