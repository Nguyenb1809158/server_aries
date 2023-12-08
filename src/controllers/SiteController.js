const Customer = require('../models/customer')
const Admin = require('../models/admin')
const Product = require('../models/product')
const Employee = require('../models/employee')
const Address = require('../models/address')
const Shipper = require('../models/shipper')
const Cart = require('../models/cart')
const Favorite = require('../models/favorite')
const Promotion = require('../models/promotion')
const Stock = require('../models/stock')
//phuong thuc(ham) cua class nay se duoc goi ben phia routes va sau do export qua file index
class SiteController {
    //trang chủ
    async api_index(req,res,next){
        try{
            const products = await Product.find().lean()// thêm lean() chỗ này sẽ trở thành truy vấn mông thông thường và thuộc tính total sẽ được thêm vào
            const productPromises = products.map(async product => {
                const stock = await Stock.find({ product: product._id });
                const total = stock.reduce((accumulator, item) => accumulator + item.quantityInStock, 0);
                product.total = total;
                return product;
            });
            const productsWithTotal = await Promise.all(productPromises);
        res.send({products:productsWithTotal,admin:req.session.admin,customer:req.session.customer,shipper:req.session.shipper,nhanvien:req.session.employee,ten:req.session.name})
        }
        catch (err) {
            // Handle errors appropriately
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }
    //xử lý đăng kí
    async api_action_regist(req,res,next){
        try{
            const employee = await Employee.findOne({phone:req.body.phone}) //kiểm tra số đt nhân viên
        if(employee != null){
            res.send({regist_fail:true})
            return
        }
        const shipper = await Shipper.findOne({phone:req.body.phone}) //kiểm tra số đt shipper
        if(shipper != null){
            res.send({regist_fail:true})
            return
        }
        const customer = await Customer.findOne({phone:req.body.phone})
        if(customer != null){
            res.send({regist_fail:true})
            return
        }
        else{
            const newCustomer = await Customer.create(req.body)
            const address = await Address.create({address:req.body.address})// tạo 1 địa chỉ mới
            await newCustomer.addresses.push(address._id) //cập nhật địa chỉ mới này vào user mới
            await newCustomer.save()
            res.send({regist_fail:false})// gửi api cho client báo thành công để chuyển hướng đăng nhập
        }
        }
        catch (err) {
            // Handle errors appropriately
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
             
    }
    //xử lý đăng nhập
    async api_action_login(req,res,next){
        try{
            const customer = await Customer.findOne(req.body) //kiểm tra tài khoản khách hàng
            if(customer != null){
                req.session.customer = true
                req.session.id_user = customer._id
                req.session.name = customer.name
                res.send({login_false : false})
                return 
            }
            const employee = await Employee.findOne(req.body) // kiểm tra tài khoản nhân viên
            if(employee != null){
                if(employee.isActive == false){
                    res.send({blocked:true})
                    return
                }
                req.session.employee = true
                req.session.id_user = employee._id
                req.session.name = employee.name
                res.send({login_false : false})
                return 
            }
            const shipper = await Shipper.findOne(req.body) // kiểm tra tài khoản shipper
            if(shipper != null){
                if(shipper.isActive == false){
                    res.send({blocked:true})
                    return
                }
                req.session.shipper = true
                req.session.id_user = shipper._id
                req.session.name = shipper.name
                res.send({login_false : false})
                return 
            }
            const admin = await Admin.findOne(req.body) // kiểm tra tài khoản admin
            if(admin != null){
                req.session.admin = true
                res.send({login_false : false})
                return 
            }
            else return res.send({login_false : true})  // ko tìm thấy tài khoản đăng nhập thất bại
        }
        catch (err) {
            // Handle errors appropriately
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
                   
    }
    // xử lý đăng xuất
    api_logout(req,res,next){
        try{
            req.session.customer=false
            req.session.admin=false
            req.session.employee=false
            req.session.shipper=false
            req.session.name=null
            req.session.id_user=null
            req.session.so_luong=0
            res.send({logout:true})
        }
        catch (err) {
            // Handle errors appropriately
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }
    async api_hat(req,res,next){
        try{
            const products = await Product.find({category : 2})
            res.send({products}) 
        }
        catch (err) {
            // Handle errors appropriately
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }  
    }

    async api_tshirt(req,res,next){
        try{
            const products = await Product.find({category : 1})
            res.send({products})
        }
        catch (err) {
            // Handle errors appropriately
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }      
    }

    async api_wallet(req,res,next){
        try{
            const products = await Product.find({category : 3})
            res.send({products})    
        }
        catch (err) {
            // Handle errors appropriately
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        } 
    }

    async api_balo(req,res,next){
        try{
            const products = await Product.find({category : 5})
            res.send({products})   
        }
        catch (err) {
            // Handle errors appropriately
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        } 
    }

    async api_glass(req,res,next){
        try{
            const products = await Product.find({category : 4})
            res.send({products}) 
        }
        catch{
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
    }
    // tìm sản phẩm trên thanh tìm kiếm
    async api_search(req,res,next){
        try{
            const products = await Product.find()
            var products_search_result = products.filter(function(product){
                if(product.name.toUpperCase().includes(req.query.key.toUpperCase()))
                return product
            })
            if(products_search_result.length > 5)
            products_search_result.length = 5
            res.send({products:products_search_result})
        }
        catch{
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }
    // lấy số sp trong giỏ
    async api_cart_number(req,res,next){
        try{
            const carts = await Cart.find({id_customer:req.session.id_user})
            if(carts != null ){
                var total = carts.reduce((accumulator,item)=>{
                    return accumulator + item.quantity
                },0)
                res.send({sl:total})
            }
            else{
                res.send({sl:0})
            }
        }
        catch{
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
      }
      // lấy số sp trong sp yêu thích
    async api_heart_number(req,res,next){
        try{
            const favorite = await Favorite.findOne({customer:req.session.id_user})
            if(favorite != null ){
                res.send({sl:favorite.products.length})
            }
            else{
                res.send({sl:0})
            }
        }
        catch{
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
      }
      // lấy khuyến mãi
    async api_get_promotions(req,res,next){
        try{
            const promotions = await Promotion.find({ isActive:true})
            if(promotions != null ){
                res.send({promotions})
            }
            else{
                res.send({promotions:null})
            }
        }
        catch{
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
      }
}
module.exports = new SiteController