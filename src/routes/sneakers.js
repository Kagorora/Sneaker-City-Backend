import express from 'express';
import clientController from '../controllers/Sneakers';
import { multerUploads } from '../middleware/multer';
import { cloudinaryConfig } from '../middleware/cloudinary';
import validator from '../middleware/validator';
import { sneakersSchema } from '../validation/schema/sneakers';
import { sizesSchema } from '../validation/schema/sizes';

const router = express.Router();

router.use('*', cloudinaryConfig);
router.post('/', multerUploads, validator(sneakersSchema), clientController.registerSneaker);
router.get('/', clientController.getRecentSneaker);
router.get('/:id', clientController.getSelectedSneaker);
router.post('/sizes/:id', validator(sizesSchema), clientController.addQuantity);

export default router;
