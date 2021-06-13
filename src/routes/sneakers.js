import express from 'express';
import clientController from '../controllers/Sneakers';
import { multerUploads } from '../middleware/multer';
import { cloudinaryConfig } from '../middleware/cloudinary';
import validator from '../middleware/validator';
import { sneakersSchema } from '../validation/schema/sneakers';

const router = express.Router();

router.use('*', cloudinaryConfig);
router.post('/', multerUploads, validator(sneakersSchema), clientController.registerSneaker);

export default router;
