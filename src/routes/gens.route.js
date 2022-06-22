// ----------------------------------------------
// Importation du module router de express
// ----------------------------------------------
const router = require('express').Router();

// ----------------------------------------------
// Définition de l'enssembles des constantes utilisant le controller
// ----------------------------------------------
const {
    getAllgens,
    getgensById,
    getgensByName,
    creategens,
    updategensById,
    deletegensById
} = require('../controllers/gens.controller');




// ----------------------------------------------
// ----------------------------------------------
// ------------ Définition des routes -----------
// ----------------------------------------------
// ----------------------------------------------




// ----------------------------------------------
// Récupérer l'enssembles des gens
// ----------------------------------------------

router.get('/', getAllgens); // GET localhost:8081/api/v1/gens


// ----------------------------------------------
// Récupérer un gens par son ID
// ----------------------------------------------


router.get('/:id', getgensById); // GET localhost:8081/api/v1/gens/:id


// ----------------------------------------------
// Récupérer un gens par son nom
// ----------------------------------------------


router.get('/filter/:nom', getgensByName); // GET localhost:8081/api/v1/gens/filter/:nom


// ----------------------------------------------
// Créer un nouvel enregistrement en BDD
// ----------------------------------------------
router.post('/', creategens); // POST localhost:8081/api/v1/gens


// ----------------------------------------------
// Mettre à jour un gens par son ID
// ----------------------------------------------
router.patch('/:id', updategensById); // PATCH localhost:8081/api/v1/gens/:id


// ----------------------------------------------
// Supprimer un gens par son ID
// ----------------------------------------------
router.delete('/:id', deletegensById); // DELETE localhost:8081/api/v1/gens/:id


// ----------------------------------------------
// ----------------------------------------------
module.exports = router;
