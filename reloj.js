const ZKLib = require('zklib-js');
var zkInstance = null;

const conexion = async () => {
    zkInstance = new ZKLib('10.0.0.244', 4370, 5200, 5000);
    try {
        // Create socket to machine
        await zkInstance.createSocket()
        //console.log("se realizo conexion con el reloj");

    } catch (e) {
        console.log("Error en la conexion de reloj");
        console.log(e);
    }
}
conexion();

const registrar = async(datos)=>{        
        let u = await zkInstance.setUser(datos.uid, datos.userid, datos.name, datos.password+'', datos.role, datos.cardno);
        console.log('user registrado ',u, datos.userid);    
}

const listar = async(datos)=>{        
    const users = await zkInstance.getUsers()
    console.log(users)
}

module.exports={registrar}