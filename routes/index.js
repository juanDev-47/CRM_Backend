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
    router.post('/clientes', clienteController.nuevoCliente);

    // obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    // mostrar cliente en expecifico
    router.get('/clientes/:id', clienteController.mostrarCliente);

    // actualizar cliente en expecifico
    router.put('/clientes/:id',clienteController.actualizarCliente);

    // eliminar cliente en expecifico
    router.delete('/clientes/:id', clienteController.eliminarCliente);

    // fin rutas clientes


    // inicio rutas productos

    // agregar un producto
    router.post('/productos',
    productoController.subirArchivo,
    productoController.nuevoProducto);
    
    // busqueda de productos
    router.post('/productos/busqueda/:query', productoController.buscarProducto);

    // listar los productos
    router.get('/productos', productoController.mostrarProductos);

    // producto especifico
    router.get('/productos/:id', productoController.mostrarProducto);

    // actualizar especifico
    router.put('/productos/:id', productoController.actualizarProducto);

    // eliminar especifico
    router.delete('/productos/:id', productoController.eliminarProducto);

    // fin rutas productos 

    // inicio rutas pedidos

    // agregar nuevo pedido
    router.post('/pedidos/nuevo/:id', pedidosController.nuevoPedido);

    // mostrar los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);

    // mostrar pedido por id
    router.get('/pedidos/:id', pedidosController.mostrarPedido);

    // acutalizar pedidos
    router.put('/pedidos/:id', pedidosController.actualizarPedido);

    // eliminar pedidos
    router.delete('/pedidos/:id', pedidosController.eliminarPedido);


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