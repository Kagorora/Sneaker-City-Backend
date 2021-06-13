import model from '../database/models';
import { v4 as uuidv4 } from 'uuid';
import { uploader } from '../middleware/cloudinary';
import path from 'path';
import imageDataURI from 'image-data-uri';

const { Sneakers } = model;

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

      return res.status(201).send({
        message: `${req.body.category} added successful`,
      });
    } catch (error) {
      return res.status(500).send({
        error: 'Server error',
      });
    }
  }
}

export default SneakersManager;
