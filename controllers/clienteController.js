const Clientes = require('../models/Clientes');

// agrega nuevo cliente 
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);
    try {
        await cliente.save();
        res.json(cliente);
    } catch (error) {
        res.send(error);
        next();
    }
}

// listar clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

// actualiza clientes
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({_id : req.params.id}, req.body, {
            new: true
        });
        res.json(cliente);
    } catch (error) {
        res.send(error);
        next();
    }
}

// eliminar cliente
exports.eliminarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndDelete({_id : req.params.id});
        res.json({"mensaje": "Cliente eliminado"});
    } catch (error) {
        console.log(error);
        next();
    }
}

// mostrar un cliente en especifico
exports.mostrarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findById(req.params.id);
        if(!cliente) 
        {
            res.json({"mensaje": "El cliente no existe"});
            next();
        } else
        {
        res.json(cliente);
        }
    } catch (error) {
        console.log(error);
        next();
    }
}