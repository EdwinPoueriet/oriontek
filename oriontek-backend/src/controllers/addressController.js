const Address = require('../models/address');

exports.addAddress = async (req, res) => {
  try {
    const address = await Address.create({
      ...req.body,
      ClientId: req.params.clientId
    });
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      where: { ClientId: req.params.clientId }
    });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      where: {
        id: req.params.addressId,
        ClientId: req.params.clientId
      }
    });
    if (!address) {
      return res.status(404).json({ message: 'Dirección no encontrada' });
    }
    await address.update(req.body);
    res.json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      where: {
        id: req.params.addressId,
        ClientId: req.params.clientId
      }
    });
    if (!address) {
      return res.status(404).json({ message: 'Dirección no encontrada' });
    }
    await address.destroy();
    res.json({ message: 'Dirección eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};