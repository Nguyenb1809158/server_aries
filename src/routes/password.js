const express = require('express');
const passwordController = require('../controllers/PasswordController');
const router = express.Router();
router.get('/api/get_pin/:phone',passwordController.api_get_pin) //tạo mã 
router.post('/api/confirm',passwordController.api_confirm)// kiểm tra mã xác nhận
// tiến hành đổi mk
router.post('/api/change_pass_kh',passwordController.api_change_pass_kh)
router.post('/api/change_pass_nv',passwordController.api_change_pass_nv)
router.post('/api/change_pass_shipper',passwordController.api_change_pass_shipper)
router.post('/api/change_pass_admin',passwordController.api_change_pass_admin)
module.exports = router;