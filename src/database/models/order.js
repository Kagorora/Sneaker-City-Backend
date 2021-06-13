module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      shoeId: DataTypes.UUID,
      size: DataTypes.INTEGER,
    },
    {},
  );

  Order.associate = (models) => {
    Order.belongsTo(models.Sneakers, {
      foreignKey: 'shoeId',
      as: 'order',
      timestamps: false,
    });
  };
  return Order;
};
