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

  Sneakers.associate = (models) => {
    Sneakers.hasMany(models.Sizes, {
      foreignKey: 'sneakersId',
      as: 'sizes',
      timestamps: false,
    });

    Sneakers.hasMany(models.Order, {
      foreignKey: 'shoeId',
      as: 'order',
      timestamps: false,
    });
  };

  return Sneakers;
};
