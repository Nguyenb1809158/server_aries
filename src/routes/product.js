const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

//api
router.post('/api/store',productController.api_check_access,productController.api_store)//tạo sản phẩm
router.get('/api/products',productController.api_check_access,productController.api_products);
router.get('/api/add_inventory/:id',productController.api_check_access,productController.api_add_inventory);//hiển thị trang tồn kho
router.post('/api/action/add_inventory',productController.api_check_access,productController.api_action_add_inventory);//tiến hành thêm tồn kho
router.get('/api/inventory/:id',productController.api_check_access,productController.api_inventory);//xem danh sách các tồn kho
router.post('/api/add_image/:id',productController.api_check_access,productController.api_add_image);//thêm hình cho sản phẩm
router.get('/api/:id',productController.api_detail); //dữ liệu cho trang chi tiết sản phẩm
router.post('/api/:id',productController.api_amount); //lấy số lượng sản phẩm
router.get('/api/edit/:id',productController.api_check_access,productController.api_edit);//hiển thị dữ liệu cho trang cập nhật
router.put('/api/update/:id',productController.api_check_access,productController.api_update);//xử lý cập nhật
// có thể ẩn sản phẩm thay vì xóa đi
// router.get('/api/delete/:id',productController.api_check_access,productController.api_delete);//
// router.delete('/api/action_delete/:id',productController.api_check_access,productController.api_action_delete);//



module.exports = router;