const moogoose = require('mongoose')
async function connect(){
    try{
        await moogoose.connect('mongodb://localhost:27017/ecommerce_dev',{
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
        console.log('kết nối thành công tới csdl ecommerce_dev')
    }
    catch(error){
        console.log('kết nối thất bại tới csdl ecommerce')
    }
}
module.exports = { connect }