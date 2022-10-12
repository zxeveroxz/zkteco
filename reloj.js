const ZKLib = require('zklib-js');
const fetch = require("node-fetch");
var zkInstance = null;
var logg = null;

const conexion = async () => {
    zkInstance = new ZKLib('10.0.0.244', 4370, 5200, 5000);
    try {
        // Create socket to machine
        await zkInstance.createSocket()
        //console.log("se realizo conexion con el reloj");

        await zkInstance.getRealTimeLogs(async (data) => {
            // do something when some checkin
            console.log(data);
            try {
                const res = await fetch("http://10.0.0.7:3030/envio_dni/" + data.userId);
                const json = await res.text();
                console.log(json);
            } catch (error) {
                console.log(error);
            }
        });

    } catch (e) {
        console.log("Error en la conexion de reloj");
        console.log(e);
    }
}
conexion();



const registrar = async (datos) => {

    let u = await zkInstance.setUser(datos.uid, datos.userid, datos.name, datos.password + '', datos.role, datos.cardno);
    //console.log('user registrado ',u, datos.userid);    
    if (u != false)
        return true;
}

const listar = async () => {
    const users = await zkInstance.getUsers();
    return users;
}

module.exports = { registrar, listar }