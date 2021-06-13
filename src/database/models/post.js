module.exports = (sequelize, DataTypes) => {
  const Sneakers = sequelize.define(
    'Sneakers',
    {
      brandName: DataTypes.STRING,
      model: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      picture: DataTypes.ARRAY(DataTypes.TEXT),
      releaseDate: DataTypes.DATE,
    },
    {},
  );

  return Sneakers;
};
