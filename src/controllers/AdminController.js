const Employee = require('../models/employee')
const Customer = require('../models/customer')
const Shipper = require('../models/shipper')
const Category = require('../models/category')
const Promotion = require('../models/promotion')
const Order = require('../models/order')
class AdminController {
    // kiểm tra tư cách admin
    api_check_access(req,res,next){
        if(req.session.admin != true){
            res.send({denied:true})
        }
        else {
            next()
        }
    }
    // lấy danh sách nhân viên
    async api_employees(req,res,next){
        try{
            const employees = await Employee.find()
            res.send({employees})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
          }
        
    }
    // tạo tài khoản nhân viên
    async api_action_add_employee(req,res,next){
        try{
            const employee = await Employee.findOne({phone:req.body.phone}) //kiểm tra số đt nhân viên
            if(employee != null){
                res.send({created:false})
                return
            }
            const shipper = await Shipper.findOne({phone:req.body.phone}) //kiểm tra số đt shipper
            if(shipper != null){
                res.send({created:false})
                return
            }
            const customer = await Customer.findOne({phone:req.body.phone}) // kiểm tra số đt khách
            if(customer != null){
                res.send({created:false})
                return
            }
            else{
                const newEmployee = await Employee.create(req.body)
                newEmployee.save()
                res.send({created:true})
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
          }
        
        
    }
    // khóa tài khoản nhân viên
    async api_block_employee(req,res,next){
        try{
            await Employee.findByIdAndUpdate(req.params.id,{isActive:false})
            res.send({blocked:true})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
          }
        
    }
    // mở khóa tk nhân viên
    async api_unblock_employee(req,res,next){
        try{
            await Employee.findByIdAndUpdate(req.params.id,{isActive:true})
            res.send({unblocked:true})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
          }
        
    }
    // lấy danh sách shipper
    async api_shippers(req,res,next){
        try{
            const shippers = await Shipper.find()
            res.send({shippers})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
          }
        
    }
    // tạo tài khoản shipper
    async api_action_add_shipper(req,res,next){
        try{
            const employee = await Employee.findOne({phone:req.body.phone}) //kiểm tra số đt nhân viên
            if(employee != null){
                res.send({created:false})
                return
            }
            const shipper = await Shipper.findOne({phone:req.body.phone}) //kiểm tra số đt shipper
            if(shipper != null){
                res.send({created:false})
                return
            }
            const customer = await Customer.findOne({phone:req.body.phone}) // kiểm tra số đt khách
            if(customer != null){
                res.send({created:false})
                return
            }
            else{
                const newShipper = await Shipper.create(req.body)
                newShipper.save()
                res.send({created:true})
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
          }
        
        
    }

    // khóa tài khoản shipper
    async api_block_shipper(req,res,next){
        try{
            await Shipper.findByIdAndUpdate(req.params.id,{isActive:false})
            res.send({blocked:true})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
          }
        
    }
    // mở khóa tk shipper
    async api_unblock_shipper(req,res,next){
        try{
            await Shipper.findByIdAndUpdate(req.params.id,{isActive:true})
            res.send({unblocked:true})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }
    //danh sách khuyến mãi
    async api_promotions(req,res,next){
        try{
            const promotions = await Promotion.find()
            res.send({promotions})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }
    // thêm 1 khuyến mãi mới
    async api_action_add_promotion(req,res,next){
        try{
            const promotion = await Promotion.findOne({code:req.body.code})
            if(promotion != null){
                res.send({add:false})
            }
            else {
                await Promotion.create(req.body)
                res.send({add:true})
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }
    //tạm khóa khuyến mãi
    async api_block_promotion(req,res,next){
        try{
            await Promotion.findByIdAndUpdate(req.params.id,{isActive:false})
            res.send({blocked:true})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }
    // mở khóa khuyến mãi
    async api_unblock_promotion(req,res,next){
        try{
            await Promotion.findByIdAndUpdate(req.params.id,{isActive:true})
            res.send({unblocked:true})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
    }
    //xem danh sách đơn hàng
    async api_orders(req,res,next){
        try{
            const orders = await Order.find().populate('employee').populate('shipper')
            res.send({orders})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
      }
}
module.exports = new AdminController ;