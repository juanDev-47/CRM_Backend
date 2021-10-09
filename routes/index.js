const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidosController = require('../controllers/pedidosController');
const usuarioController = require('../controllers/usuariosController');

// middle para proteger las rutas 
const auth = require('../middleware/auth');

module.exports = function() {
    // agregar nuevos clients via post
    router.post('/clientes',auth, clienteController.nuevoCliente);

    // obtener todos los clientes
    router.get('/clientes',auth, clienteController.mostrarClientes);

    // mostrar cliente en expecifico
    router.get('/clientes/:id',auth, clienteController.mostrarCliente);

    // actualizar cliente en expecifico
    router.put('/clientes/:id',auth, clienteController.actualizarCliente);

    // eliminar cliente en expecifico
    router.delete('/clientes/:id',auth, clienteController.eliminarCliente);

    // fin rutas clientes


    // inicio rutas productos

    // agregar un producto
    router.post('/productos',
    auth,
    productoController.subirArchivo,
    productoController.nuevoProducto);
    
    // busqueda de productos
    router.post('/productos/busqueda/:query',auth, productoController.buscarProducto);

    // listar los productos
    router.get('/productos',auth, productoController.mostrarProductos);

    // producto especifico
    router.get('/productos/:id',auth, productoController.mostrarProducto);

    // actualizar especifico
    router.put('/productos/:id',auth, productoController.actualizarProducto);

    // eliminar especifico
    router.delete('/productos/:id',auth, productoController.eliminarProducto);

    // fin rutas productos 

    // inicio rutas pedidos

    // agregar nuevo pedido
    router.post('/pedidos/nuevo/:id',auth, pedidosController.nuevoPedido);

    // mostrar los pedidos
    router.get('/pedidos',auth, pedidosController.mostrarPedidos);

    // mostrar pedido por id
    router.get('/pedidos/:id',auth, pedidosController.mostrarPedido);

    // acutalizar pedidos
    router.put('/pedidos/:id',auth, pedidosController.actualizarPedido);

    // eliminar pedidos
    router.delete('/pedidos/:id',auth, pedidosController.eliminarPedido);


    // oauth usuarios

    // crear un usuario nuevo, ver el schema para saber que pide
    router.post('/crear-cuenta',
        usuarioController.registrarUsuario
    );

    router.post('/iniciar-sesion',
        usuarioController.autenticarUsuario
    );


    // fin rutas pedidos


    return router;
}