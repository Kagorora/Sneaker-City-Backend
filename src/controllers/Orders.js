import model from '../database/models';
import { v4 as uuidv4 } from 'uuid';

const { Sizes, Order, Sneakers } = model;

class orderManager {
  static async addOrder(req, res) {
    try {
      const id = uuidv4();

      // check if that shoe exists and that size is available
      const shoeExists = await Sizes.findAll({
        where: {
          sneakersId: `${req.params.id}`,
          size: `${req.body.size}`,
        },
      });

      if (shoeExists.length < 1)
        return res.status(404).send({
          error: `Shoe is unavailable`,
        });

      // check if the same order is not already in the cart
      const orderExists = await Order.findAll({
        where: {
          shoeId: `${req.params.id}`,
          size: `${req.body.size}`,
        },
      });

      // check if the ordered Quantity is not more than what is available in the stock
      if (req.body.orderQuantity > shoeExists[0].quantity) {
        return res.status(400).send({
          message: `Only ${shoeExists[0].quantity} are available`,
        });
      }

      if (orderExists.length > 0)
        return res.status(409).send({
          message: `Order already made, please check your cart`,
        });

      const order = await Order.create({ ...req.body, id, shoeId: req.params.id });

      if (order)
        return res.status(201).send({
          message: `Order added`,
        });
    } catch (error) {
      return res.status(500).send({
        error: error,
      });
    }
  }

  static async viewAllOrders(req, res) {
    const orders = await Order.findAll({
      include: [
        { model: Sneakers, as: 'order' },
        {
          model: Sneakers,
          as: 'order',
        },
      ],
    });

    if (orders.length < 1)
      return res.status(404).send({
        error: `Cart is empty`,
      });

    return res.status(200).send({
      orders,
    });
  }
}

export default orderManager;
