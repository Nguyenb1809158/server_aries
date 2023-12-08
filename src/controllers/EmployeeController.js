const Order = require('../models/order')
const Stock = require('../models/stock')
const OrderDetail = require('../models/orderDetail')
class NhanvienController {
    api_check_access(req,res,next){
      if(req.session.employee == true){
      next()
      }
      else {
      res.send({denied:true})
      }
      }
      //xem danh sách đơn hàng
    async api_orders(req,res,next){
      try{
        const orders = await Order.find().populate('employee')
        res.send({orders})
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
      
    }

    async api_confirm_order(req,res,next){
      try{
        await Order.findByIdAndUpdate(req.params.id,{state:2,employee:req.session.id_user})
        res.send({confirmed:true})
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
      
    }
    //cập nhật hoàn trả số dư kho
    async update_cancel(req,res,next){
      try{
        var orders = await OrderDetail.find({id_order:req.params.id})
        // không sử dụng trực tiếp await trong các phương thức mảng nên cần khai báo async
        for (const item of orders) {
        var stock = await Stock.findOne({product: item.product,size: item.size,color: item.color});
        if (stock) {
          var newQuantity = stock.quantityInStock + item.quantity;
          await Stock.updateOne(
            { _id: stock._id },
            { quantityInStock: newQuantity }
          );
        }
        }
        next() // chuyển qua middleware kế xử lý trạng thái
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
      
      }
      // tiến hành điền thông tin hủy đơn
      async api_cancel_order(req,res,next){
        try{
          const today = new Date()
          await Order.findByIdAndUpdate(req.params.id,{state:7,employee:req.session.id_user,cancelAt:today})
          res.send({canceled:true})
        }
        catch (err) {
          console.error(err);
          res.status(500).send({ error: 'Internal server error' });
      }
        
      }

}
module.exports = new NhanvienController 

