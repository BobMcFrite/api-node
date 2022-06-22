// ----------------------------------------------
// Importation du module router de express
// ----------------------------------------------
const router = require('express').Router();

// ----------------------------------------------
// Définition de l'enssembles des constantes utilisant le controller
// ----------------------------------------------
const {
    getAlldettes,
    getdetteById,
    getdetteByName,
    createdette,
    updatedetteById,
    deletedetteById
} = require('../controllers/dette.controller');




// ----------------------------------------------
// ----------------------------------------------
// ------------ Définition des routes -----------
// ----------------------------------------------
// ----------------------------------------------




// ----------------------------------------------
// Récupérer l'enssembles des dettes
// ----------------------------------------------

router.get('/', getAlldettes); // GET localhost:8081/api/v1/dettes


// ----------------------------------------------
// Récupérer un dette par son ID
// ----------------------------------------------

router.get('/:id', getdetteById); // GET localhost:8081/api/v1/dettes/:id


// ----------------------------------------------
// Récupérer un dette par son nom
// ----------------------------------------------

router.get('/filter/:nom', getdetteByName); // GET localhost:8081/api/v1/dettes/filter/:nom


// ----------------------------------------------
// Créer un nouvel enregistrement en BDD
// ----------------------------------------------
router.post('/', createdette); // POST localhost:8081/api/v1/dettes


// ----------------------------------------------
// Mettre à jour un dette par son ID
// ----------------------------------------------
router.patch('/:id', updatedetteById); // PATCH localhost:8081/api/v1/dettes/:id


// ----------------------------------------------
// Supprimer un dette par son ID
// ----------------------------------------------
router.delete('/:id', deletedetteById); // DELETE localhost:8081/api/v1/dettes/:id


// ----------------------------------------------
// ----------------------------------------------
module.exports = router;
