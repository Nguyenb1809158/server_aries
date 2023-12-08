const express = require('express');
const router = express.Router();
const shipperController = require('../controllers/ShipperController');

router.get('/api/orders',shipperController.api_check_access,shipperController.api_orders);//
router.get('/api/get_order/:id',shipperController.api_check_access,shipperController.api_get_order);//
router.get('/api/delivered/:id',shipperController.api_check_access,shipperController.api_delivered);
router.get('/api/delivery_fail/:id',shipperController.api_check_access,shipperController.update_cancel,shipperController.api_delivery_fail);//
module.exports = router;