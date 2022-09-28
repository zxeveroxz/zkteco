const ZKLib = require('zklib-js')
    const test = async () => {
    let zkInstance = new ZKLib('10.0.0.244', 4370, 5200, 5000);
    try {
        // Create socket to machine
        await zkInstance.createSocket()


        // Get general info like logCapacity, user counts, logs count
        // It's really useful to check the status of device

        console.log(await zkInstance.getInfo())

       // await zkInstance.setUser(1112, '40405050', 'testing 40405050', '111', 0, 0);

       // const users = await zkInstance.getUsers()
       // console.log(users)
/*
        const logs = await zkInstance.getAttendances(function() {
          if (err) throw err;
          console.log("Very cool!");
       })
       console.log(logs)
*/
await zkInstance.getRealTimeLogs((data)=>{
  // do something when some checkin
  console.log(data)
})

        return;
      } catch (e) {
        console.log(e)
        if (e.code === 'EADDRINUSE') {
        }
    }


    // Get users in machine

   // const users = await zkInstance.getUsers()
   // console.log(users)


    // Create new user: setUser(uid, userid, name, password, role = 0, cardno = 0)
    
    //await zkInstance.setUser(1111, '4040', 'testing 4040 id 1111', '111', 0, 0);


    // Get all logs in the machine
    // Currently, there is no filter to take data, it just takes all !!

    const logs = await zkInstance.getAttendances(function() {
       if (err) throw err;
       console.log("Very cool!");
    })
    console.log(logs)



    // You can also read realtime log by getRealTimelogs function

    await zkInstance.getRealTimeLogs((data)=>{
        // do something when some checkin
        console.log(data)
    })

    // Get the current Time in the machine

   // const z = await zkInstance.getTime();
   // console.log(z.toString());



 
   // zkInstance.clearAttendanceLog();


    // Disconnect the machine ( don't do this when you need realtime update :)))
    await zkInstance.disconnect()

}

test()  // in the end we execute the function