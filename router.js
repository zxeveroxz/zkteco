const express = require('express')
const router = express.Router();

const {actualizar} = require('./mysql')
const {listar} = require('./reloj');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })
  // define the home page route
  router.get('/', (req, res) => {
    res.send('PAGINA DE INICIO - Birds home page')
  })
  // define the about route
  router.get('/about', (req, res) => {
    res.send('About birds')
  })

  router.get('/actualizar',async (req,res)=>{
    let r = await actualizar();
    res.send("Actualizacion completa.. "+r);
  });

  router.get('/listar',async (req,res)=>{
    let r = await listar();
    res.json(r);
  });
  
  module.exports = router
