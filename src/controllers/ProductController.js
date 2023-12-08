const Product = require('../models/product')
const ImageProduct = require('../models/imageProduct')
const Size = require('../models/productSize')
const Color = require('../models/productColor')
const Stock = require('../models/stock')
class ProductController {
    // kiểm tra tư cách admin
    api_check_access(req,res,next){
        if(req.session.admin ==  true){
            next()
        }
        else {
          res.send({denied:true})
        }
        }
    // tạo sản phẩm mới
    async api_store(req,res,next){
        try{
            await Product.create(req.body)
            res.send({create:true})
        }
        catch{
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        }
    // lấy danh sách sản phẩm quản lý
    async api_products(req, res, next) {
        try {
            const products = await Product.find().lean()// thêm lean() chỗ này sẽ trở thành truy vấn mông thông thường và thuộc tính total sẽ được thêm vào
            const productPromises = products.map(async product => {
                const stock = await Stock.find({ product: product._id });
                const total = stock.reduce((accumulator, item) => accumulator + item.quantityInStock, 0);
                product.total = total;
                return product;
            });
            const productsWithTotal = await Promise.all(productPromises);
            res.send({ products: productsWithTotal });
        } catch (err) {
            // Handle errors appropriately
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
    }
    //hiển thị trang Thêm tồn kho sản phẩm 
    async api_add_inventory(req,res,next){
        try{
            const sizes = await Size.find()
            const colors = await Color.find()
            res.send({colors:colors,sizes:sizes})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }
    // tiến hành tăng tồn kho nếu có sẵn hoặc tạo mới nếu chưa có sẵn
    async api_action_add_inventory(req,res,next){
        try{
            const stock = await Stock.findOne({product:req.body.product,color:req.body.color,size:req.body.size})
            if(stock != null){
                var sl_moi = Number(`${req.body.quantityInStock}`)
                var sl_cu = Number(`${stock.quantityInStock}`)
                req.body.quantityInStock = sl_moi + sl_cu
                await Stock.findOneAndUpdate({product:req.body.product,color:req.body.color,size:req.body.size},req.body)
                res.send({sent:true})
            }
            else{
                await Stock.create(req.body)
                res.send({sent:true})
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }
    // trả dữ liệu để hiện trang quản lý tồn kho
    async api_inventory(req,res,next){
        try{
            const stock = await Stock.find({product:req.params.id}).populate({ path: 'color', select: 'color' }).populate({ path: 'size', select: 'size' }).populate({ path: 'product', select: 'name imageUrl' })
            res.send({stock})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }
    // tiến hành thêm ảnh sản phẩm
    async api_add_image(req,res,next){
        try{
            const product = await Product.findById(req.params.id)
            await product.imageUrl.push(req.body.imageUrl)
            await product.save()
            res.send({created : true})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }

    async api_detail(req,res,next){
        try{
            const product = await Product.findById(req.params.id)
            const stock = await Stock.find({product:req.params.id}).populate('color').populate('size')
            // lấy danh sách các size có tồn kho
            let sizes = stock.map(stock=>{
                return stock.size
            })
            // loại bỏ các size trùng trong mảng trên
            const set = new Set(sizes);
            sizes = Array.from(set);
            // làm tương tự với màu
            let colors = stock.map(stock=>{
                return stock.color
            })
            const set2 = new Set(colors);
            colors = Array.from(set2);
            res.send({product,colors,sizes})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }
    // lấy số lượng chính xác của sản phẩm
    async api_amount(req,res,next){
        try{
            const stock = await Stock.findOne(req.body)
            if(stock != null){
                res.send({ton_kho:stock.quantityInStock})
            }
            else
            res.send({ton_kho:0})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }
    // hiển thị tt sản phẩm trang cập nhật
    async api_edit(req,res,next){
        try{
            const product = await Product.findById(req.params.id)
            res.send({product})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }
    // cập nhật
    async api_update(req,res,next){
        try{
            await Product.findByIdAndUpdate(req.params.id,req.body)
            res.send({updated:true})
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        }
        
    }
}
module.exports = new ProductController ;