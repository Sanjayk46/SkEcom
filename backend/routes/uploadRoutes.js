// const express =require ('express');
// const { body, check } =require('express-validator');
// const multer = require ('multer');
// const validateRequest =require('../middleware/validator');

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${file.originalname}`);
//   }
// });

// const fileFilter = (req, file, cb) => {
//     if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     // To accept the file pass `true`, like so:
//     cb(null, true);
//   } else {
//         // To reject this file pass `false`, like so:
//     cb('Images only!');
//   }
// };

// const upload = multer({ storage, fileFilter }).single('image');

// router.post('/', upload, (req, res) => {
//   if (!req.file)
//     throw res.status(400).json({error: 'No file uploaded'});

//   res.send({
//     message: 'Image uploaded',
//     imageUrl: `/${req.file.path}`
//   });
// });

// module.exports= router;
const express = require('express');
const { body, check, validationResult } = require('express-validator');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const validateRequest = require('../middleware/validator');

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,       // Your cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your cloudinary API secret
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder in your Cloudinary account to store files
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed image formats
    public_id: (req, file) => file.originalname.split('.')[0], // File name in Cloudinary
  },
});

// Multer upload settings
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'), false); // Reject the file
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
}).single('image');

// Validation middleware
const validateUpload = [
  check('image')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('No file uploaded');
      }
      return true;
    })
    .withMessage('Image file is required'),
];

// Route for handling image uploads
router.post(
  '/',
  upload,
  validateUpload,
  validateRequest, // Middleware to check validation errors
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Handle the uploaded file
    const imageUrl = req.file.path; // The image URL in Cloudinary
    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: imageUrl, // Return the Cloudinary URL
    });
  }
);

module.exports = router;
