require('dotenv').config();
var sleep = require('sleep-promise');
const { registrar } = require('./reloj');

const mysql = require('mysql2/promise');
let connection = null;
async function actualizar() {
    
    connection = await mysql.createConnection(
        {
            host: process.env.DB_HOSTNAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    //const [rows, fields] = await connection.execute('SELECT * FROM `tbl_participantes` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);
    const [rows, fields] = await connection.execute('SELECT * FROM `tbl_participantes`', []);

    await rows.forEach(async (row, i) => {
        //await sleep(100 * i);
        let datos = `${row.pat.substring(0, 10)} ${row.mat.substring(0, 1)}. ${row.nombres.substring(0, 8)}`;
        let data = { uid: row.idx + 100, userid: row.nro_doc, name: datos.toUpperCase(), password: '', role: 0, cardno: 0 };
        let r = await registrar(data);  
    });
    return "Actualizacion Completa...";
}  

async function buscar($dni){
    const [row, fields] = await connection.execute('SELECT * FROM tbl_participantes where tip_doc=? and nro_doc=?', ['dni',$dni]);
    return row;
}
//actualizar();


module.exports = {actualizar,buscar}