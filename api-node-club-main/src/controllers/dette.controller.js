// ----------------------------------------------
// Importantion du modèle pour la table dette
// ----------------------------------------------
const detteModel = require('../models/dette.model');


// ----------------------------------------------
// Récupérer l'enssembles des dettes
// ----------------------------------------------
getAlldettes = (request, response) => {
    detteModel.getAlldettes((error, data) => {
        if (error)
            response.status(500).send({
                message:
                    error.message || "Une erreur est survenue en essayant de récupérer la table dette."
            });
        else response.send(data);
    });
};


// ----------------------------------------------
// Récupérer un dette par son ID
// ----------------------------------------------
getdetteById = (request, response) => {
    detteModel.getdetteById(request.params.id, (error, data) => {
        if (error) {
            if (error.kind === "index_not_found") {
                response.status(404).send({
                    message: `L'id ${request.params.id} de la table dette n'a pas était trouvé.`
                });
            } else {
                response.status(500).send({
                    message: `L'id ${request.params.id} de la table dette n'a pas était trouvé.`
                });
            }
        } else response.send(data);
    });
};



// ----------------------------------------------
// Récupérer un dette par son nom
// ----------------------------------------------
getdetteByName = (request, response) => {
    detteModel.getdetteByName(request.params.nom, (error, data) => {
        if (error) {
            if (error.kind === "name_not_found") {
                response.status(404).send({
                    message: `${request.params.nom} n'a pas était trouvé. `
                });
            } else {
                response.status(500).send({
                    message: `${request.params.nom} n'a pas était trouvé. `
                });
            }
        } else response.send(data);
    });
};


// ----------------------------------------------
// Créer un nouvel enregistrement en BDD
// ----------------------------------------------
createdette = (request, response) => {
    // Vérification si la requette est complété (le JSON)
    // le request.body permet de récupérer le contenue de la requette
    if (!request.body) {
        response.status(400).send({
            message: "Le contenue ne peut être vide !"
        });
    }

    // Sauvegarde du nouvel enregistrement dans le BDD
    detteModel.createdette(new detteModel.detteConstructor(request.body), (error, data) => {
        if (error)
            response.status(500).send({
                message:
                    error.message || "Des erreurs sont apparues en créant le nouvel dette."
            });
        else response.send(data);
    });
};


// ----------------------------------------------
// Mettre à jour un dette par son ID
// ----------------------------------------------
updatedetteById = (request, response) => {
    if (!request.body) {
        response.status(400).send({
            message: "Le contenue ne peut être vide !"
        });
    }

    detteModel.updatedetteById(request.params.id, new detteModel.detteConstructor(request.body), (error, data) => {
        if (error) {
            if (error.kind === "selected_dette_not_found") {
                response.status(404).send({
                    message: `L'id ${request.params.id} de la table dette n'a pas était trouvé.`
                });
            } else {
                response.status(500).send({
                    message: "Error lors de la mise à jour de la table pour l'id " + request.params.id
                });
            }
        } else response.send(data);
    }
    );
};


// ----------------------------------------------
// Supprimer un dette par son ID
// ----------------------------------------------
deletedetteById = (request, response) => {
    detteModel.deletedetteById(request.params.id, (error, data) => {
        if (error) {
            if (error.kind === "index_not_found") {
                response.status(404).send({
                    message: `L'id ${request.params.id} de la table dette n'a pas était trouvé.`
                });
            } else {
                response.status(500).send({
                    message: "Impossible de supprimer l'enregistrement de la table dette avec l'id " + request.params.id
                });
            }
        } else response.send({ message: `L'enregistrement de la table dette à bien était supprimé` });
    });
};


// ----------------------------------------------
// ----------------------------------------------
module.exports = {
    getAlldettes,
    getdetteById,
    getdetteByName,
    createdette,
    updatedetteById,
    deletedetteById
}
