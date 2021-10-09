const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = mongoose.Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Clientes'
    },
    pedido: [{ 
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'Productos'
        },
    cantidad: Number
    }],
    total: {
        type: Number
    }
});

module.exports = mongoose.model('pedidos', PedidoSchema);

