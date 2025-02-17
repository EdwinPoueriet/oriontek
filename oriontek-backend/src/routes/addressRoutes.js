const express = require('express');
const router = express.Router({ mergeParams: true });
const addressController = require('../controllers/addressController');
const { body } = require('express-validator');
const validator = require('../middleware/validator');

const validateAddress = [
  body('streetAddress').notEmpty().trim(),
  body('city').notEmpty().trim(),
  body('state').notEmpty().trim(),
  body('postalCode').notEmpty().trim(),
  validator.validate
];

router.post('/', validateAddress, addressController.addAddress);
router.get('/', addressController.getAddresses);
router.put('/:addressId', validateAddress, addressController.updateAddress);
router.delete('/:addressId', addressController.deleteAddress);

module.exports = router;