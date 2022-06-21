// ----------------------------------------------
// Importation de la connexion à la bdd
// ----------------------------------------------
const dataBase = require('../db/db_connect');


// ----------------------------------------------
// Création d'un constructeur pour la création et la mise à jour des enregistrements
// ----------------------------------------------
const clubConstructor = function (club) {
    this.nom = club.nom;
    this.email = club.email;

};


// ----------------------------------------------
// Récupérer l'enssembles des clubs
// ----------------------------------------------
getAllclubs = result_bdd_request => {
    dataBase.query("SELECT * FROM club ", (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        // Le premier null représente les erreurs
        result_bdd_request(null, response);
    });
};


// ----------------------------------------------
// Récupérer un club par son ID
// ----------------------------------------------
getclubById = (selectedID, result_bdd_request) => {
    dataBase.query(`SELECT * FROM club WHERE id = ${selectedID}`, (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        if (response.length) {
            result_bdd_request(null, response);
            return; // Très important pour indiquer à node que l'on doit quitter la condition ! Dans une condition, node ne quitte pas de lui même sauf si c'est une erreur !!!
        }

        result_bdd_request({ kind: "index_not_found" });
    });
};


// ----------------------------------------------
// Récupérer un club par son nom
// ----------------------------------------------
getclubByName = (selectedName, result_bdd_request) => {
    dataBase.query(`SELECT * FROM club WHERE titre = '${selectedName}'`, (error, response) => {
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
createclub = (newclub, result_bdd_request) => {
    dataBase.query('INSERT INTO club SET nom = ?, email = ?', [newclub.nom, newclub.email],
        (error, response) => {
            if (error) {
                result_bdd_request(error);
            }
            result_bdd_request(null, { id: response.insertId, ...newclub });
        });
};


// ----------------------------------------------
// Mettre à jour un club par son ID
// ----------------------------------------------
updateclubById = (selectedID, selectedclub, result_bdd_request) => {
    dataBase.query(
        "UPDATE club SET nom = ?, email = ? WHERE id = ?",
        [selectedclub.nom, selectedclub.email, selectedID],
        (error, response) => {
            if (error) {
                result_bdd_request(error);
            }
            if (response.affectedRows == 0) {
                result_bdd_request({ kind: "selected_club_not_found" });
                return;
            }
            result_bdd_request(null, { id: selectedID, ...selectedclub });
        }
    );
};


// ----------------------------------------------
// Supprimer un club par son ID
// ----------------------------------------------
deleteclubById = (selectedID, result_bdd_request) => {
    dataBase.query("DELETE FROM club WHERE id = ?", selectedID, (error, response) => {
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
    clubConstructor,
    getAllclubs,
    getclubById,
    getclubByName,
    createclub,
    updateclubById,
    deleteclubById
};
