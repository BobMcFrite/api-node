// ----------------------------------------------
// Importation de la connexion à la bdd
// ----------------------------------------------
const dataBase = require('../db/db_connect');


// ----------------------------------------------
// Création d'un constructeur pour la création et la mise à jour des enregistrements
// ----------------------------------------------
const gensConstructor = function (gens) {
    this.club_id = gens.club_id;
    this.nom = gens.nom;
    this.prenom = gens.prenom;
};


// ----------------------------------------------
// Récupérer l'ensembles des gens
// ----------------------------------------------
getAllgens = result_bdd_request => {
    dataBase.query("SELECT * FROM gens", (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        // Le premier null représente les erreurs
        result_bdd_request(null, response);
    });
};


// ----------------------------------------------
// Récupérer un gens par son ID
// ----------------------------------------------
getgensById = (selectedID, result_bdd_request) => {
    dataBase.query(`SELECT * FROM gens WHERE club_id = ${selectedID}`, (error, response) => {
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
// Récupérer un gens par son nom
// ----------------------------------------------
getgensByName = (selectedName, result_bdd_request) => {
    dataBase.query(`SELECT * FROM gens WHERE club_id = '${selectedName}'`, (error, response) => {
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
creategens = (newgens, result_bdd_request) => {
    dataBase.query('INSERT INTO gens SET club_id = ?, nom = ?, prenom = ?', [newgens.club_id, newgens.nom, newgens.prenom],
        (error, response) => {
            if (error) {
                result_bdd_request(error);
            }
            result_bdd_request(null, { id: response.insertId, ...newgens });
        });
};


// ----------------------------------------------
// Mettre à jour un gens par son ID
// ----------------------------------------------
updategensById = (selectedID, selectedgens, result_bdd_request) => {
    dataBase.query(
        "UPDATE gens SET club_is = ?, nom = ?, prenom = ? WHERE id = ?",
        [selectedgens.club_is, selectedgens.nom, selectedgens.prenom, selectedID],
        (error, response) => {
            if (error) {
                result_bdd_request(error);
            }
            if (response.affectedRows == 0) {
                result_bdd_request({ kind: "selected_gens_not_found" });
                return;
            }
            result_bdd_request(null, { id: selectedID, ...selectedgens });
        }
    );
};


// ----------------------------------------------
// Supprimer un gens par son ID
// ----------------------------------------------
deletegensById = (selectedID, result_bdd_request) => {
    dataBase.query("DELETE FROM gens WHERE id = ?", selectedID, (error, response) => {
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
    gensConstructor,
    getAllgens,
    getgensById,
    getgensByName,
    creategens,
    updategensById,
    deletegensById
};
