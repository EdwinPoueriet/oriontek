const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { body } = require('express-validator');
const validator = require('../middleware/validator');

const validateClient = [
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('email').isEmail(),
  body('phone').optional(),
  validator.validate
];

router.post('/', validateClient, clientController.createClient);
router.get('/', clientController.getClients);
router.get('/:id', clientController.getClientById);
router.put('/:id', validateClient, clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;