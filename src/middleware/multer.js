import multer from 'multer';

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).fields([{ name: 'picture', maxCount: 12 }]);

export { multerUploads };
