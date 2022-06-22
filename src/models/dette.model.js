// ----------------------------------------------
// Importation de la connexion à la bdd
// ----------------------------------------------
const dataBase = require('../db/db_connect');


// ----------------------------------------------
// Création d'un constructeur pour la création et la mise à jour des enregistrements
// ----------------------------------------------
const detteConstructor = function (dette) {
    this.gensId = dette.gensId;
    this.montant = dette.montant;

};


// ----------------------------------------------
// Récupérer l'enssembles des dettes
// ----------------------------------------------
getAlldettes = result_bdd_request => {
    dataBase.query("SELECT * FROM dettes", (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        // Le premier null représente les erreurs
        result_bdd_request(null, response);
    });
};


// ----------------------------------------------
// Récupérer un dette par son ID
// ----------------------------------------------
getdetteById = (selectedID, result_bdd_request) => {
    dataBase.query(`SELECT * FROM dettes WHERE id = ${selectedID}`, (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        if (response.length) {
            result_bdd_request(null, response);
            return; // Très important pour indiquer à node que l'on doit quitter la condition ! Dans une condition, node ne quitte pas de lui même sauf si c'est une erreur !!!
        }
        // Si jamais l'id renseigné n'existe pas je bind un nom qui sera utilisé dans le controller
        result_bdd_request({ kind: "index_not_found" });
    });
};


// ----------------------------------------------
// Récupérer un dette par son nom
// ----------------------------------------------
getdetteByName = (selectedName, result_bdd_request) => {
    dataBase.query(`SELECT * FROM dettes WHERE titre = '${selectedName}'`, (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        if (response.length) {
            result_bdd_request(null, response);
            return;
        }
        result_bdd_request({ kind: "name_not_found" });
    });
};


// ----------------------------------------------
// Créer un nouvel enregistrement en BDD
// ----------------------------------------------
createdette = (newdette, result_bdd_request) => {
    var gens_id = newdette.gensId;
    gens_id = gens_id.replace('/api/v1/gens/','');
    dataBase.query('INSERT INTO dettes SET gens_id = ?, montant = ?', [gens_id, newdette.montant],
        (error, response) => {
            if (error) {
                result_bdd_request(error);
            }
            result_bdd_request(null, { id: response.insertId, ...newdette });
        });
};


// ----------------------------------------------
// Mettre à jour un dette par son ID
// ----------------------------------------------
updatedetteById = (selectedID, selecteddette, result_bdd_request) => {
    console.log(selecteddette);
    var gens_id = selecteddette.gensId;
    gens_id = gens_id.replace('/api/v1/gens/','');
    dataBase.query(
        "UPDATE dettes SET gens_id = ?, montant = ? WHERE id = ?",
        [gens_id, selecteddette.montant, selectedID],
        (error, response) => {
            if (error) {
                result_bdd_request(error);
            }
            if (response.affectedRows == 0) {
                result_bdd_request({ kind: "selected_dette_not_found" });
                return;
            }
            result_bdd_request(null, { id: selectedID, ...selecteddette });
        }
    );
};


// ----------------------------------------------
// Supprimer un dette par son ID
// ----------------------------------------------
deletedetteById = (selectedID, result_bdd_request) => {
    dataBase.query("DELETE FROM dettes WHERE id = ?", selectedID, (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        if (response.affectedRows == 0) {
            result_bdd_request({ kind: "index_not_found" });
            return;
        }
        result_bdd_request(null, response);
    });
};


// ----------------------------------------------
// ----------------------------------------------
module.exports = {
    detteConstructor,
    getAlldettes,
    getdetteById,
    getdetteByName,
    createdette,
    updatedetteById,
    deletedetteById
};
