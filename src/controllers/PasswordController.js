const nodemailer = require('nodemailer');
const Customer = require('../models/customer')
const Admin = require('../models/admin')
const Employee = require('../models/employee')
const Shipper = require('../models/shipper')
const ChangePassword = require('../models/changePassword')
class PasswordController {
    // lấy mã pin
    async api_get_pin(req,res,next){
      try{
        const customer = await Customer.findOne({phone:req.params.phone}) //kiểm tra tài khoản khách hàng
        if(customer != null){
          { 
            var code = Math.floor(Math.random()*1000000)
            const pin = await ChangePassword.create({phone:customer.phone,code})
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'ariesshopctu@gmail.com',
                pass: 'wzvtukkgtciggisd'
              }
            })
            var mailOptions = {
              from: 'ariesshopctu@gmail.com',
              to: customer.email,
              subject: 'Email change password in Aries Shop',
              text: `Mã xác nhận của bạn là : ${code}`
            }
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error)
              } else {
                console.log('Email sent: ' + info.response);
              }
            })
            setTimeout(async()=>{
              await ChangePassword.findByIdAndDelete(pin._id)
            },300000)
            res.send({sent:true,type:'khach_hang'})
            return
          }
        }
      const employee = await Employee.findOne({phone:req.params.phone}) //kiểm tra tài khoản nhân viên
        if(employee != null){
          { 
            var code = Math.floor(Math.random()*1000000)
            const pin = await ChangePassword.create({phone:employee.phone,code})
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'ariesshopctu@gmail.com',
                pass: 'wzvtukkgtciggisd'
              }
            })
            var mailOptions = {
              from: 'ariesshopctu@gmail.com',
              to: employee.email,
              subject: 'Email change password in Aries Shop',
              text: `Mã xác nhận của bạn là : ${code}`
            }
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error)
              } else {
                console.log('Email sent: ' + info.response);
              }
            })
            setTimeout(async()=>{
              await ChangePassword.findByIdAndDelete(pin._id)
            },300000)
            res.send({sent:true,type:'nhan_vien'})
            return
          }
        }    
      const shipper = await Shipper.findOne({phone:req.params.phone}) //kiểm tra tài khoản shipper
        if(shipper != null){
          { 
            var code = Math.floor(Math.random()*1000000)
            const pin = await ChangePassword.create({phone:shipper.phone,code})
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'ariesshopctu@gmail.com',
                pass: 'wzvtukkgtciggisd'
              }
            })
            var mailOptions = {
              from: 'ariesshopctu@gmail.com',
              to: shipper.email,
              subject: 'Email change password in Aries Shop',
              text: `Mã xác nhận của bạn là : ${code}`
            }
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error)
              } else {
                console.log('Email sent: ' + info.response);
              }
            })
            setTimeout(async()=>{
              await ChangePassword.findByIdAndDelete(pin._id)
            },300000)
            res.send({sent:true,type:'shipper'})
            return
          }
        }
      const admin = await Admin.findOne({phone:req.params.phone}) //kiểm tra tài khoản shipper
        if(admin != null){
          { 
            var code = Math.floor(Math.random()*1000000)
            const pin = await ChangePassword.create({phone:'admin',code})
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'ariesshopctu@gmail.com',
                pass: 'wzvtukkgtciggisd'
              }
            })
            var mailOptions = {
              from: 'ariesshopctu@gmail.com',
              to: admin.email,
              subject: 'Email change password in Aries Shop',
              text: `Mã xác nhận của bạn là : ${code}`
            }
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error)
              } else {
                console.log('Email sent: ' + info.response);
              }
            })
            setTimeout(async()=>{
              await ChangePassword.findByIdAndDelete(pin._id)
            },300000)
            res.send({sent:true,type:'admin'})
            return
          }
        }
        else{
          res.send({sent:false})
        }
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
      
    }
    // kiểm tra mã xác nhận
    async api_confirm(req,res,next){
      try{
        const pin = await ChangePassword.findOne({code:req.body.code,phone:req.body.phone})
        if(pin != null){
          res.send({confirmed:true})
        }
        else{
          res.send({confirmed:false})
        }
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
      
    }
    async api_change_pass_kh(req,res,next){
      try{
        await Customer.findOneAndUpdate({phone:req.body.phone},{password:req.body.password})
        res.send({updated : true})
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
      
    }
    async api_change_pass_nv(req,res,next){
      try{
        await Employee.findOneAndUpdate({phone:req.body.phone},{password:req.body.password})
        res.send({updated : true})
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
    }
    async api_change_pass_shipper(req,res,next){
      try{
        await Shipper.findOneAndUpdate({phone:req.body.phone},{password:req.body.password})
        res.send({updated : true})
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
      
    }
    async api_change_pass_admin(req,res,next){
      try{
        await Admin.findOneAndUpdate({phone:req.body.phone},{password:req.body.password})
        res.send({updated : true})
      }
      catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
      
    }
}
module.exports = new PasswordController ;