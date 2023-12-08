const express = require('express');
const router = express.Router();

const customerController = require('../controllers/CustomerController');

//nhóm api địa chỉ
router.get('/api/address',customerController.api_check_access,customerController.api_address)
router.delete('/api/delete_address/:id',customerController.api_check_access,customerController.api_delete)
router.post('/api/add_address',customerController.api_check_access,customerController.api_add)
//nhóm api sản phẩm yêu thích
router.get('/api/love',customerController.api_check_access,customerController.api_love_product);//sản phẩm yêu thích
router.get('/api/add_love/:id',customerController.api_check_access,customerController.api_add_love);//
router.delete('/api/delete_love_product/:id',customerController.api_check_access,customerController.api_delete_love)//
//nhóm api giỏ hàng
router.get('/api/cart',customerController.api_check_access,customerController.api_cart);//hiển thị sản phẩm trong giỏ
router.post('/api/add_product',customerController.api_check_access,customerController.api_add_product);//thêm sản phẩm vào giỏ
router.delete('/api/cart/delete/:id',customerController.api_check_access,customerController.api_delete_incart)//xóa sản phẩm trong giỏ
//nhóm api xem đơn hàng và hủy đơn hàng
router.get('/api/order/list_order',customerController.api_check_access,customerController.api_list_order);//
router.get('/api/order_detail/:id',customerController.api_order_detail);//tao middware moi tru guest
router.get('/api/order/cancel/:id',customerController.api_check_access,customerController.update_cancel,customerController.api_cancel_order)//hủy đơn
//nhóm api đặt hàng
router.get('/api/order/check',customerController.api_check_access,customerController.api_check_order);//
router.get('/api/order',customerController.api_check_access,customerController.api_data_handler);//kiểm tra tồn kho
router.get('/api/check_promotion',customerController.api_check_access,customerController.api_check_promotion);//
router.post('/api/order/action',customerController.api_check_access,customerController.update_data,customerController.api_block_order);//
module.exports = router;