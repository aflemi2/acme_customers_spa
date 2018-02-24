const conn = require('./conn');
const { Sequelize } = conn;

const Customer = conn.define( 'customer', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    isEmail: true
  }
})

module.exports = Customer;
