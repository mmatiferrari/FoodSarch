const { Router } = require('express');
const recipe = require('./recipe.js');
const diets = require('./diets.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipe', recipe)
router.use('/types', diets)





module.exports = router;
