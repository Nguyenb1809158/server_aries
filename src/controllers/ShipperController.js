const Order = require('../models/order')
const Stock = require('../models/stock')
const OrderDetail = require('../models/orderDetail')
class ShipperController {
    async api_orders(req,res,next){
      try{
        const orders = await Order.find().populate('shipper','name').populate('employee','name')
        res.send({orders})
      }
      catch{
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
      
    }

    async api_get_order(req,res,next){
      try{
        const today = new Date()
        await Order.findByIdAndUpdate(req.params.id,{state:3,shipper:req.session.id_user,deliverAt:today}) 
        res.send({got_order : true})
      }
      catch{
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
    }

    async api_delivered(req,res,next){
      try{
        const today = new Date()
        await Order.findByIdAndUpdate(req.params.id,{state:4,shipper:req.session.id_user,completeAt:today}) 
        res.send({delivered:true})
      }
      catch{
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
      catch{
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
      
      }

      async api_delivery_fail(req,res,next){
        try{
          const today = new Date()
          await Order.findByIdAndUpdate(req.params.id,{state:5,shipper:req.session.id_user,completeAt:today})
          res.send({failed:true})
        }
        catch{
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
      }

      api_check_access(req,res,next){
      if(req.session.shipper != true){
      res.send({denied:true})
      }
      else {
        next()
       }
      }


}
module.exports = new ShipperController ;