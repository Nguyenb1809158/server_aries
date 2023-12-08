const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/EmployeeController');
// api
router.get('/api/orders',employeeController.api_check_access,employeeController.api_orders);//
router.get('/api/confirm_order/:id',employeeController.api_check_access,employeeController.api_confirm_order);//
router.get('/api/order/cancel/:id',employeeController.api_check_access,employeeController.update_cancel,employeeController.api_cancel_order);//
module.exports = router;