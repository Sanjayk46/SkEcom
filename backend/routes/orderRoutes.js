const express = require( 'express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliver,
  getOrders
} =require( '../controllers/orderController.js');
const validateRequest =require('../middleware/validator.js');
const { param, check } =require('express-validator');

const router = express.Router();

const validator = {
  getOrderById: [
    param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid Id Format')
  ],
  updateOrderToPaid: [
    param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid Id Format')
  ],
  updateOrderToDeliver: [
    param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid Id Format')
  ],
  addOrderItems: [
    check('cartItems').notEmpty().withMessage('Cart items are required'),
    check('shippingAddress').notEmpty().withMessage('Shipping address is required'),
    check('paymentMethod').notEmpty().withMessage('Payment method is required'),
    check('itemsPrice')
      .notEmpty()
      .withMessage('Items price is required')
      .isNumeric()
      .withMessage('Items price must be a number'),
    check('taxPrice')
      .notEmpty()
      .withMessage('Tax price is required')
      .isNumeric()
      .withMessage('Tax price must be a number'),
    check('shippingPrice')
      .notEmpty()
      .withMessage('Shipping price is required')
      .isNumeric()
      .withMessage('Shipping price must be a number'),
    check('totalPrice')
      .notEmpty()
      .withMessage('Total price is required')
      .isNumeric()
      .withMessage('Total price must be a number')
  ]
}

router.route('/')
  .post(validator.addOrderItems,protect, validateRequest, addOrderItems)
  .get(protect, admin, getOrders);

router.get('/my-orders', protect, getMyOrders);
router.get('/:id', validator.getOrderById, validateRequest, protect, getOrderById);
router.put('/:id/pay', validator.updateOrderToPaid, validateRequest, protect, updateOrderToPaid);
router.put('/:id/deliver', validator.updateOrderToDeliver, validateRequest, protect, admin, updateOrderToDeliver);

module.exports= router;
