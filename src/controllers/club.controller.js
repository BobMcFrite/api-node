// ----------------------------------------------
// Importantion du modèle pour la table club
// ----------------------------------------------
const clubModel = require('../models/club.model');


// ----------------------------------------------
// Récupérer l'enssembles des clubs
// ----------------------------------------------
getAllclubs = (request, response) => {
    clubModel.getAllclubs((error, data) => {
        if (error)
            response.status(500).send({
                message:
                    error.message || "Une erreur est survenue en essayant de récupérer la table club."
            });
        else {

            let result = new Array;
            let ids = new Array;
            let j = 0;
            
            for (let i = 0; i < data.length; i++) {
                if(!ids.includes(data[i].id)){
                    ids[j] = data[i].id;
                    result[j] = data[i];

                    if(result[j].gens != null){
                        result[j].gens = ["/api/v1/gens/"+result[j].gens];
                    }else{
                        result[j].gens = [];
                    }
                    j++;
                }else{
                    
                    for(let k = 0; k < result.length; k++){
                        if(result[k].id == data[i].id){
                            result[k].gens.push("/api/v1/gens/"+data[i].gens);
                        }
                    }
                    
                }
            }

            response.send(result);
        }
    });
};


// ----------------------------------------------
// Récupérer un club par son ID
// ----------------------------------------------
getclubById = (request, response) => {
    clubModel.getclubById(request.params.id, (error, data) => {
        if (error) {
            if (error.kind === "index_not_found") {
                response.status(404).send({
                    message: `L'id ${request.params.id} de la table club n'a pas était trouvé.`
                });
            } else {
                response.status(500).send({
                    message: `L'id ${request.params.id} de la table club n'a pas était trouvé.`
                });
            }
        } else {

            let result = new Array;
            let ids = new Array;
            let j = 0;
            
            for (let i = 0; i < data.length; i++) {
                if(!ids.includes(data[i].id)){
                    console.log('test');
                    ids[j] = data[i].id;
                    result[j] = data[i];

                    if(result[j].gens != null){
                        result[j].gens = ["/api/v1/gens/"+result[j].gens];
                    }else{
                        result[j].gens = [];
                    }
                    j++;
                }else{
                    
                    for(let k = 0; k < result.length; k++){
                        if(result[k].id == data[i].id){
                            result[k].gens.push("/api/v1/gens/"+data[i].gens);
                        }
                    }
                    
                }
            }

            response.send(result[0]);
        }
    });
};



// ----------------------------------------------
// Récupérer un club par son nom
// ----------------------------------------------
getclubByName = (request, response) => {
    clubModel.getclubByName(request.params.nom, (error, data) => {
        if (error) {
            if (error.kind === "name_not_found") {
                response.status(404).send({
                    message: `${request.params.nom} n'a pas était trouvé.`
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
createclub = (request, response) => {
    // Vérification si la requette est complété (le JSON)
    // le request.body permet de récupérer le contenue de la requette
    if (!request.body) {
        response.status(400).send({
            message: "Le contenue ne peut être vide !"
        });
    }

    // Sauvegarde du nouvel enregistrement dans le BDD
    clubModel.createclub(new clubModel.clubConstructor(request.body), (error, data) => {
        if (error)
            response.status(500).send({
                message:
                    error.message || "Des erreurs sont apparues en créant le nouvel club."
            });
        else response.send(data);
    });
};


// ----------------------------------------------
// Mettre à jour un club par son ID
// ----------------------------------------------
updateclubById = (request, response) => {
    if (!request.body) {
        response.status(400).send({
            message: "Le contenue ne peut être vide !"
        });
    }

    clubModel.updateclubById(request.params.id,new clubModel.clubConstructor(request.body), (error, data) => {
        if (error) {
            if (error.kind === "selected_club_not_found") {
                response.status(404).send({
                    message: `L'id ${request.params.id} de la table club n'a pas était trouvé.`
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
// Supprimer un club par son ID
// ----------------------------------------------
deleteclubById = (request, response) => {
    clubModel.deleteclubById(request.params.id, (error, data) => {
        if (error) {
            if (error.kind === "index_not_found") {
                response.status(404).send({
                    message: `L'id ${request.params.id} de la table club n'a pas était trouvé.`
                });
            } else {
                response.status(500).send({
                    message: "Impossible de supprimer l'enregistrement de la table club avec l'id " + request.params.id
                });
            }
        } else response.send({ message: `L'enregistrement de la table club à bien était supprimé` });
    });
};


// ----------------------------------------------
// ----------------------------------------------
module.exports = {
    getAllclubs,
    getclubById,
    getclubByName,
    createclub,
    updateclubById,
    deleteclubById
}
