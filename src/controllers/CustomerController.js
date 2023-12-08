const Address = require('../models/address')
const Customer = require('../models/customer')
const Favorite = require('../models/favorite')
const Cart = require('../models/cart')
const Stock = require('../models/stock')
const Promotion = require('../models/promotion')
const Order = require('../models/order')
const OrderDetail = require('../models/orderDetail')
const Product = require('../models/product')
class CustomerController {
  // xử lý nếu tài khoản ko phải là khách hàng sử dụng tính năng này
  api_check_access(req,res,next){
    if(req.session.customer != true){
        res.send({denied:true})
    }
    else {
        next()
    }
    }
  //nhóm địa chỉ khách hàng
  async api_address(req,res,next){
    try{
      const customer = await Customer.findOne({_id:req.session.id_user}).populate('addresses')
      res.send({address:customer.addresses}) 
    }
    catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal server error' });
    }
      
    }

  async api_delete(req,res,next){
    try{
      await Address.deleteOne({_id : req.params.id})
      const customer = await Customer.findById(req.session.id_user)
      await customer.addresses.pull({_id:req.params.id}) //cập nhật địa chỉ mới này vào user mới
      await customer.save()
      res.send({delete:true})
    }
    catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal server error' });
    }
      
      }
  // thêm địa chỉ    
  async api_add(req,res,next){
    try{
      const address = await Address.create({address:req.body.address})// tạo 1 địa chỉ mới
      const customer = await Customer.findById(req.session.id_user)
      await customer.addresses.push(address._id) //cập nhật địa chỉ mới này vào user mới
      await customer.save()
      res.send({add:true})
    }
    catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal server error' });
    }
    
    }
    // thêm sản phẩm vào danh sách sp yêu thích
    async api_add_love(req,res,next){
      try{
        const favorite = await Favorite.findOne({customer:req.session.id_user})
      if(favorite != null ){
        const existence = favorite.products.some(item=>{
          return (item == req.params.id)
        })
        if(existence){
          res.send({add:false})
        }
        else{
          await favorite.products.push(req.params.id)
          await favorite.save()
          res.send({add:true})
        }
      }
      else{
        const newFavorate = await Favorite.create({customer:req.session.id_user})
        await newFavorate.products.push(req.params.id)
        await newFavorate.save()
        res.send({add:true})
      }
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      }
      

    }
    //lấy danh sách sản phẩm yêu thích
    async api_love_product(req,res,next){
      try{
        const favorite = await Favorite.findOne({customer:req.session.id_user}).populate('products')
        res.send({loves : favorite.products})  
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      }
        
    }
    //xóa khỏi danh sách yêu thích
    async api_delete_love(req,res,next){
      try{
        const favorite = await Favorite.findOne({customer:req.session.id_user}).populate('products')
        await favorite.products.pull({_id:req.params.id})
        await favorite.save()
        res.send({deleted:true})
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      }
      
    }
    //thêm sản phẩm vào giỏ
    async api_add_product(req,res,next){
      try{
        req.body.id_customer = req.session.id_user
        var quantity = Number(`${req.body.quantity}`)
        const cart = await Cart.findOne({id_customer:req.session.id_user,size:req.body.size,color: req.body.color})
        if(cart != null){
          req.body.quantity = quantity + cart.quantity
          await Cart.findByIdAndUpdate(cart._id,req.body)
          res.send({add:true})
        }
        else {
          await Cart.create(req.body)
          res.send({add:true})
        }
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      }
      
    }
    // lấy sản phẩm trong giỏ hàng của khách hàng
    async api_cart(req,res,next){
      try{
        var carts = await Cart.find({id_customer:req.session.id_user}).populate('size').populate('color').populate('product')
        var total = carts.reduce((accumulator,item)=>{
          var total = item.quantity * item.product.price
          return total+accumulator
        },0)
        res.send({products:carts,total})
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      }
      
    }
    // xóa sản phẩm trong giỏ
    async api_delete_incart(req,res,next){
      try{
        await Cart.findByIdAndDelete(req.params.id)
        res.send({deleted:true})
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      }
      
    }
    // xem số lượng đặt trong tồn kho
    async api_data_handler(req,res,next){
      try{
        var carts = await Cart.find({id_customer:req.session.id_user})
        // không sử dụng trực tiếp await trong các phương thức mảng nên cần khai báo async
        var stockPromises = carts.map(async (item) => {
          var stock = await Stock.findOne({product: item.product,size: item.size,color: item.color});
          return { item, stock }
        });
        var stocks = await Promise.all(stockPromises) // chờ cho lấy số dư vì some cần 1 hàm đồng bộ và nó sẽ ko chờ
        var outOfStock = stocks.some(({ item, stock }) => {
          return item.quantity > stock.quantityInStock
        })
    
        if (outOfStock) {
          res.send({ order: false });
        } else {
          res.send({ order: true });
        }
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      }
      
    }
    // hiển thị thông tin để khách hàng kiểm tra lại
    async api_check_order(req,res,next){
      try{
        var carts = await Cart.find({id_customer:req.session.id_user}).populate('size').populate('color').populate('product')
        var total = carts.reduce((accumulator,item)=>{
          var total = item.quantity * item.product.price
          return total+accumulator
        },0)
        const customer = await Customer.findById(req.session.id_user).populate('addresses')
        res.send({products:carts,total,customer})
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      }
      
    }
    // kiểm tra khuyến mãi
    async api_check_promotion(req,res,next){
      try{
        const promotion = await Promotion.findOne({code:req.query.code})
        if(promotion){
          res.send({promotion:promotion})
        }
        else{
          res.send({promotion:false})
        }
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      }
      
    }
    // cập nhật tồn kho
    async update_data(req,res,next){
      try{
        var carts = await Cart.find({id_customer:req.session.id_user})
        // không sử dụng trực tiếp await trong các phương thức mảng nên cần khai báo async
        for (const item of carts) {
        var stock = await Stock.findOne({product: item.product,size: item.size,color: item.color});
        if (stock) {
          var newQuantity = stock.quantityInStock - item.quantity;
          await Stock.updateOne(
            { _id: stock._id },
            { quantityInStock: newQuantity }
          );
        }
        }
        next()
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      }
      
  }
    // xử lý chốt đơn tạo đơn hàng và chi tiết đơn hàng
    async api_block_order(req,res,next){
      try{
        req.body.customer = req.session.id_user
        const newOrder = await Order.create(req.body)
        const carts = await Cart.find({id_customer:req.session.id_user})
        carts.map(async item=>{
          let product = await Product.findById(item.product)
          let orderDetailItem = await OrderDetail.create({id_order:newOrder._id,product:item.product,quantity:item.quantity,size:item.size,color:item.color,price:product.price})
          await orderDetailItem.save()
        })
        await Cart.deleteMany({id_customer:req.session.id_user})
        res.send({ordered:true})
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      }
      
      }
      // hiển thị danh sách đơn hàng đã tạo
      async api_list_order(req,res,next){
        try{
        const orders = await Order.find({customer:req.session.id_user}).populate('employee').populate('shipper')
        res.send({orders})
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
      //
    async api_cancel_order(req,res,next){
      try{
        const today = new Date()
        await Order.findByIdAndUpdate(req.params.id,{state:6,cancelAt:today})
        res.send({updated:true})
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      }
        
      }
    async api_order_detail(req,res,next){
      try{
        const order = await Order.findById(req.params.id).populate('promotion')
        var discountPercentage = 0
        if( order.promotion != null){
          discountPercentage = order.promotion.discountPercentage
        }
        const orderlist = await OrderDetail.find({id_order:req.params.id}).populate('product','name imageUrl').populate('size').populate('color')
        var prev_total = orderlist.reduce((accumulator,item)=>{
          return item.price*item.quantity + accumulator
        },0)
        res.send({prev_total,total:order.totalPrice,products:orderlist,discountPercentage})
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
      }
      
    }
}
module.exports = new CustomerController 