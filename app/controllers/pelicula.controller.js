// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar db."nombreModelo".   
const db = require("../models");
const Pelicula = db.pelicula;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Client, definiendo una variable con la estructura del reques para luego solo ser enviada como parametro mas adelante. 
    const nuevapelicula = {
        nombre: req.body.nombre,
        sinopis: req.body.sinopis,
        actor: req.body.actor, 
        duracion: req.body.duracion,
        tipo: req.body.tipo,
        categoria: req.body.categoria,
        aniolanzamiento: req.body.aniolanzamiento,
        // utilizando ? nos ayuda a indicar que el paramatro puede ser opcional dado que si no viene, le podemos asignar un valor default
        status: req.body.status ? req.body.status : false
    };

    // Save a new Client into the database
    Pelicula.create(nuevapelicula)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the pelicula."
            });
        });
};

// Retrieve all Client from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Pelicula.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pelicula."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pelicula.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving pelicula with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Pelicula.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pelicula was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Client with id=${id}. Maybe Pelicula was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Client with id=" + id
            });
        });
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante where id = parametro que recibimos 
    Pelicula.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "pelicula was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete pelicula with id=${id}. El pelicula no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
    Pelicula.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} pelicula were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all pelicula."
            });
        });
};

// find all active Client, basado en el atributo status vamos a buscar que solo los clientes activos
exports.findAllStatus = (req, res) => {
    Pelicula.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pelicula."
            });
        }); 
};