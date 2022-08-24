const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', { //define la tabla videogame
    id:{
      type: DataTypes.UUID, // uuid te genera un numero random con letras y numeros que va a ser unico. 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, 
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating:{
      type: DataTypes.FLOAT,
    },
    released: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    createdInDb:{  //Para cuando se haga la distincion entre lo que trae la api y lo que trae la db.
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
    // Mi videojuego de la db lo va a tener y todo el resto no.
  });
};