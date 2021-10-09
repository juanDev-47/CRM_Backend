const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if( file.mimetype === 'image/jpeg' || file.mimetype === 'imege/npg') {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    }
}

// pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');

// sube un archivo 
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        return next();
    })
}

// agregar producto
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if(req.file.filename) {
            producto.imagen = req.file.filename;
            console.log(producto.imagen);
        }

        console.log(producto);
        await producto.save();
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

// mostrar todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// mostrar producto por id
exports.mostrarProducto = async (req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.id);
        if(!producto)
        {
            res.json('producto no encontrado, intente con otro');
            next();
        } else {
            res.json(producto);
        }
    } catch (error) {
        console.log(error);
        next();
    }
}

// actualizar producto
exports.actualizarProducto = async (req, res, next) => {


    try {
        const producto = await Productos.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true
        });
            // console.log(producto);
            res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

// eliminar producto
exports.eliminarProducto = async (req, res, next) => {
    try {
        const producto = await Productos.findByIdAndDelete({_id: req.params.id});
            res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.buscarProducto = async (req,res,next) => {
    try {        
        // obtener el query
        const { query } = req.params;
        const producto = await Productos.find({nombre: new RegExp(query, 'i')});
        res.json(producto);
    } catch (error) {
       console.log(error);
       next(); 
    }
}
