const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /*score: {
      type: DataTypes.INTEGER,
      defaultValue: 0, 
      validate : {
        max: 100,
        min: 0
      }
    },*/
    healthScore:{
      type: DataTypes.INTEGER,
      defaultValue: 0, 
      validate : {
        max: 100,
        min: 0
      }
    },
    steps: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING
    },
  });
};
