'use strict'
var express = require('express');
var socketio = require('socket.io');
var mysql = require('mysql');
const http = require('http');
var soap = require('soap');
var fs = require('fs');
var path = require('path');
//var scraper = require("sunat-ruc-scraper2");
var resp="vacio"; 

var connection = mysql.createConnection({
  host     : '25.5.12.235',
  user     : 'externo2',
  password : '@pocalipsiZ20',
  database : 'BD_FACTURADOR' 
});

connection.connect(function(err) {
    if(err) throw err
    connection.query('SELECT * FROM tbl2_CDP_cab order by idx desc limit 5', function(err, rows, fields) {
      resp = rows;
      console.log('rows:', rows.length);
    connection.end();
  });
});

function envio_soap(){
    var url = 'https://e-factura.sunat.gob.pe/ol-ti-itcpfegem/billService?wsdl';
    var tik2= {'ticket':201801801203830};  
    var wsSecurity = new soap.WSSecurity('20600853563JSJ19877', 'PIZARRO+-+', {});
  soap.createClientAsync(url).then((client) => {
    client.setSecurity(wsSecurity);
    return client.getStatus(tik2);
  }).then((result) => {
    return saveCDR(result,tik2.ticket)
  });
 }
 function saveCDR(file,nombre){
    ruta = './public/RESPUESTAS/'+nombre+'.zip';    
    //fs.writeFileSync(ruta, Buffer.from(file.status.content, 'base64').toString('binary'), 'binary' )
    return nombre;
 }
 
const app = express();//instancia de express
const server = http.createServer(app);//creando el server con http y express como handle request
const io = socketio(server);//iniciando el server de socket.io
const PORT = process.env.PORT || 443;
 
app.use(express.static(path.join(__dirname, 'public')));//middleware de express para archivos estaticos
 
 //router
 app.get('/login',(req,res)=>{
    res.send("jsj");
 });
 app.get('/',(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.send(resp);
 });
 
 server.listen(PORT,()=>{
   console.log(`Server running in http://localhost:${PORT}`);
 });


io.on('connection', function(socket){
  console.log(`client: ${socket.id}`);
  
  //enviando numero aleatorio cada dos segundo al cliente
  setInterval(() => {
    socket.emit('server/random', Math.random())
  }, 1000);
  
  //recibiendo el numero aleatorio del cliente
  socket.on('client/random', (num) => {
    console.log(num)
  });
});