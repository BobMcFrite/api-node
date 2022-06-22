// ----------------------------------------------
// Importation du module router de express
// ----------------------------------------------
const router = require('express').Router();

// ----------------------------------------------
// Définition de l'enssembles des constantes utilisant le controller
// ----------------------------------------------
const {
    getAllclubs,
    getclubById,
    getclubByName,
    createclub,
    updateclubById,
    deleteclubById
} = require('../controllers/club.controller');




// ----------------------------------------------
// ----------------------------------------------
// ------------ Définition des routes -----------
// ----------------------------------------------
// ----------------------------------------------




// ----------------------------------------------
// Récupérer l'enssembles des clubs
// ----------------------------------------------

router.get('/', getAllclubs); // GET localhost:8081/api/v1/clubs


// ----------------------------------------------
// Récupérer un club par son ID
// ----------------------------------------------

router.get('/:id', getclubById); // GET localhost:8081/api/v1/clubs/:id


// ----------------------------------------------
// Récupérer un club par son nom
// ----------------------------------------------

router.get('/filter/:nom', getclubByName); // GET localhost:8081/api/v1/clubs/filter/:nom


// ----------------------------------------------
// Créer un nouvel enregistrement en BDD
// ----------------------------------------------
router.post('/', createclub); // POST localhost:8081/api/v1/clubs


// ----------------------------------------------
// Mettre à jour un club par son ID
// ----------------------------------------------
router.patch('/:id', updateclubById); // PATCH localhost:8081/api/v1/clubs/:id


// ----------------------------------------------
// Supprimer un club par son ID
// ----------------------------------------------
router.delete('/:id', deleteclubById); // DELETE localhost:8081/api/v1/clubs/:id


// ----------------------------------------------
// ----------------------------------------------
module.exports = router;
