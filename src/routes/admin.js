const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

router.get('/api/employees',adminController.api_check_access,adminController.api_employees)//danh sách nhân viên
router.post('/api/action_add_employee',adminController.api_check_access,adminController.api_action_add_employee)//tạo tài khoản nhân viên
router.get('/api/block_employee/:id',adminController.api_check_access,adminController.api_block_employee)//khóa tài khoản nhân viên
router.get('/api/unblock_employee/:id',adminController.api_check_access,adminController.api_unblock_employee)//mở khóa tk nhân viên
router.get('/api/shippers',adminController.api_check_access,adminController.api_shippers)//danh sách shipper
router.post('/api/action_add_shipper',adminController.api_check_access,adminController.api_action_add_shipper)//tạo tk shipper
router.get('/api/block_shipper/:id',adminController.api_check_access,adminController.api_block_shipper)//khóa tk shipper
router.get('/api/unblock_shipper/:id',adminController.api_check_access,adminController.api_unblock_shipper)//mở khóa tk shipper
router.get('/api/promotions',adminController.api_check_access,adminController.api_promotions)//danh sách khuyến mãi
router.post('/api/action_add_promotion',adminController.api_check_access,adminController.api_action_add_promotion)//
router.get('/api/block_promotion/:id',adminController.api_check_access,adminController.api_block_promotion)//
router.get('/api/unblock_promotion/:id',adminController.api_check_access,adminController.api_unblock_promotion)//
router.get('/api/orders',adminController.api_check_access,adminController.api_orders)//

module.exports = router;