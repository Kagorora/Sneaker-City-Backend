module.exports = (sequelize, DataTypes) => {
  const Sizes = sequelize.define(
    'Sizes',
    {
      sneakersId: DataTypes.UUID,
      size: DataTypes.INTEGER,
      available: DataTypes.BOOLEAN,
      quantity: DataTypes.INTEGER,
    },
    {},
  );

  Sizes.associate = (models) => {
    Sizes.belongsTo(models.Sneakers, {
      foreignKey: 'sneakersId',
      as: 'sizes',
      timestamps: false,
    });
  };
  return Sizes;
};
