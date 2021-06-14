import model from '../database/models';
import { v4 as uuidv4 } from 'uuid';
import { uploader } from '../middleware/cloudinary';
import path from 'path';
import imageDataURI from 'image-data-uri';
import sequelize, { Op } from 'sequelize';

const { Sneakers, Sizes } = model;

class SneakersManager {
  static async registerSneaker(req, res) {
    try {
      const sneakerExist = await Sneakers.findAll({
        where: {
          model: `${req.body.model.toLowerCase()}`,
        },
      });

      if (sneakerExist.length > 0)
        return res.status(409).send({
          error: `${req.body.model} already registered`,
        });

      req.body.model = req.body.model.toLowerCase();
      req.body.brandName = req.body.brandName.toLowerCase();

      const id = uuidv4();
      const images = [];

      // eslint-disable-next-line no-unused-vars
      for (const image in req.files) {
        const dataBuffer = new Buffer.from(req.files.picture[0].buffer);
        const mediaType = path.extname(req.files.picture[0].originalname).toString();

        const imageData = imageDataURI.encode(dataBuffer, mediaType);
        const uploadedImage = await uploader.upload(imageData);
        images.push(uploadedImage.url);
      }

      // save sneakers's information to database
      const sneakers = await Sneakers.create({ ...req.body, id, picture: images });

      if (sneakers)
        return res.status(201).send({
          message: `${req.body.model} added successful`,
        });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }

  static async getRecentSneaker(req, res) {
    try {
      const sneakers = await Sneakers.findAll({ limit: 10, order: [['releaseDate', 'DESC']] });

      if (sneakers.length === 0)
        return res.status(409).send({
          message: `no result found!`,
        });

      return res.status(200).send({
        sneakers,
      });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }

  static async getSelectedSneaker(req, res) {
    try {
      const sneakers = await Sneakers.findAll({
        where: {
          id: `${req.params.id}`,
        },
        include: [
          { model: Sizes, as: 'sizes' },
          {
            model: Sizes,
            as: 'sizes',
          },
        ],
      });

      if (sneakers.length === 0)
        return res.status(409).send({
          message: `no result found!`,
        });

      return res.status(200).send({
        sneakers,
      });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }

  static async addQuantity(req, res) {
    try {
      const sneakers = await Sizes.findAll({
        where: {
          sneakersId: `${req.params.id}`,
          size: `${req.body.size}`,
        },
      });

      if (sneakers.length > 0)
        return res.status(409).send({
          message: `Size already exists, please consider changing the existing one`,
        });

      const id = uuidv4();

      const size = await Sizes.create({ ...req.body, id, sneakersId: req.params.id });

      if (size)
        return res.status(201).send({
          message: `Size ${req.body.size} added successful`,
        });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }

  static async searchShoe(req, res) {
    try {
      // const sneakers = await Sneakers.findAll({
      //   where: {
      //     model: `${req.params.keyword}`,
      //   },
      // });

      const sneakers = await Sneakers.findAll({
        where: {
          model: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('model')),
            'LIKE',
            // eslint-disable-next-line no-useless-concat
            '%' + `${req.params.keyword.toLowerCase()}` + '%',
          ),
        },
      });

      if (sneakers.length === 0)
        return res.status(400).send({
          message: `No result found of ${req.params.keyword}`,
        });

      return res.status(200).send({
        sneakers,
      });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }
}

export default SneakersManager;
