const { UUIDV4, DataTypes } = require('sequelize')
const slugify = require('slugify')

module.exports = (sequelize) => {
  const Shelf = sequelize.define('Shelf', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    visibility: {
      type: DataTypes.STRING(200),
      defaultValue: 'public'
    },
    coverImg: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  })
}
