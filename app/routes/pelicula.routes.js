module.exports = app => {
    const Pelicula = require("../controllers/pelicula.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", Pelicula.create);
    // Retrieve all Client
    router.get("/", Pelicula.findAll);
    // Retrieve all published Client
    router.get("/status", Pelicula.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", Pelicula.findOne);
    // Update a Client with id
    router.put("/update/:id", Pelicula.update);
    // Delete a Client with id
    router.delete("/delete/:id", Pelicula.delete);
    // Delete all Cliente
    router.delete("/delete/", Pelicula.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/customer", router);
};