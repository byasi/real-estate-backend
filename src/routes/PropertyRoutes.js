const express = require("express");

const router = express.Router();

const PropertyControllers = require("../controllers/PropertyControllers");

// apis
router.post('/addProperty', PropertyControllers.registerProperty);
router.get('/', PropertyControllers.getAllProperty);
router.get('/:id',PropertyControllers.findSingleProperty);
router.delete('/delete/:id',PropertyControllers.deleteProperty);
router.patch('/updateproperty/:id', PropertyControllers.updateProperty);


module.exports = router;