const indexRouter = require('./site')
const customerRouter = require('./customer');
const employeeRouter = require('./employee');
const productRouter = require('./product');
const shipperRouter = require('./shipper');
const adminRouter = require('./admin')
const passwordRouter = require("./password")
function route(app){

    app.use('/', indexRouter);
    app.use('/admin',adminRouter);
    app.use('/customer',customerRouter);
    app.use('/employee',employeeRouter);
    app.use('/product',productRouter);
    app.use('/shipper',shipperRouter);
    app.use('/password',passwordRouter)
    
}

module.exports = route;