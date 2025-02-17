const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Client = require('./client');

const Address = sequelize.define('Address', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  streetAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
Client.hasMany(Address);
Address.belongsTo(Client);

module.exports = Address;