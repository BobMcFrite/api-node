// ----------------------------------------------
// Importantion du modèle pour la table gens
// ----------------------------------------------
const gensModel = require('../models/gens.model');


// ----------------------------------------------
// Récupérer l'enssembles des gens
// ----------------------------------------------
getAllgens = (request, response) => {
    gensModel.getAllgens((error, data) => {
        if (error)
            response.status(500).send({
                message:
                    error.message || "Une erreur est survenue en essayant de récupérer la table gens."
            });
        else {

            let result = new Array;
            let ids = new Array;
            let j = 0;

            for (let i = 0; i < data.length; i++) {
                if(!ids.includes(data[i].id)){
                    ids[j] = data[i].id;
                    result[j] = data[i];

                    result[j].clubId = "/api/v1/clubs/"+result[j].clubId;
                    if(result[j].dettes != null){
                        result[j].dettes = ["/api/v1/dettes/"+result[j].dettes];
                    }else{
                        result[j].dettes = [];
                    }
                    j++;
                }else{
                    
                    for(let k = 0; k < result.length; k++){
                        if(result[k].id == data[i].id){
                            result[k].dettes.push("/api/v1/dettes/"+data[i].dettes);
                        }
                    }
                    
                }
            }

            response.send(data);
        }
    });
};


// ----------------------------------------------
// Récupérer un gens par son ID
// ----------------------------------------------
getgensById = (request, response) => {
    gensModel.getgensById(request.params.id, (error, data) => {
        if (error) {
            if (error.kind === "index_not_found") {
                response.status(404).send({
                    message: `L'id ${request.params.id} de la table gens n'a pas était trouvé.`
                });
            } else {
                response.status(500).send({
                    message: `L'id ${request.params.id} de la table gens n'a pas était trouvé.`
                });
            }
        } else {

            let result = new Array;
            let ids = new Array;
            let j = 0;

            for (let i = 0; i < data.length; i++) {
                if(!ids.includes(data[i].id)){
                    ids[j] = data[i].id;
                    result[j] = data[i];

                    if(result[j].clubId != null){
                        result[j].clubId = "/api/v1/clubs/"+result[j].clubId;
                    }else{
                        delete result[j].clubId;
                    }
                    
                    if(result[j].dettes != null){
                        result[j].dettes = ["/api/v1/dettes/"+result[j].dettes];
                    }else{
                        result[j].dettes = [];
                    }
                    j++;
                }else{
                    
                    for(let k = 0; k < result.length; k++){
                        if(result[k].id == data[i].id){
                            result[k].dettes.push("/api/v1/dettes/"+data[i].dettes);
                        }
                    }
                    
                }
            }

            response.send(result[0])
        };
    });
};



// ----------------------------------------------
// Récupérer un gens par son nom
// ----------------------------------------------
getgensByName = (request, response) => {
    gensModel.getgensByName(request.params.nom, (error, data) => {
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
creategens = (request, response) => {
    // Vérification si la requette est complété (le JSON)
    // le request.body permet de récupérer le contenue de la requette
    if (!request.body) {
        response.status(400).send({
            message: "Le contenue ne peut être vide !"
        });
    }

    // Sauvegarde du nouvel enregistrement dans le BDD
    gensModel.creategens(new gensModel.gensConstructor(request.body), (error, data) => {
        if (error)
            response.status(500).send({
                message:
                    error.message || "Des erreurs sont apparues en créant le nouvel gens."
            });
        else response.send(data);
    });
};


// ----------------------------------------------
// Mettre à jour un gens par son ID
// ----------------------------------------------
updategensById = (request, response) => {
    if (!request.body) {
        response.status(400).send({
            message: "Le contenue ne peut être vide !"
        });
    }

    gensModel.updategensById(request.params.id, new gensModel.gensConstructor(request.body), (error, data) => {
        if (error) {
            if (error.kind === "selected_gens_not_found") {
                response.status(404).send({
                    message: `L'id ${request.params.id} de la table gens n'a pas était trouvé.`
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
// Supprimer un gens par son ID
// ----------------------------------------------
deletegensById = (request, response) => {
    gensModel.deletegensById(request.params.id, (error, data) => {
        if (error) {
            if (error.kind === "index_not_found") {
                response.status(404).send({
                    message: `L'id ${request.params.id} de la table gens n'a pas était trouvé.`
                });
            } else {
                response.status(500).send({
                    message: "Impossible de supprimer l'enregistrement de la table gens avec l'id " + request.params.id
                });
            }
        } else response.send({ message: `L'enregistrement de la table gens à bien était supprimé` });
    });
};


// ----------------------------------------------
// ----------------------------------------------
module.exports = {
    getAllgens,
    getgensById,
    getgensByName,
    creategens,
    updategensById,
    deletegensById
}
