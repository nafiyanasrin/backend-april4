const Order = require('../../models/order');


const createOrder = async (req, res) => {
    try {
        if(!req.body) throw new Error('please fill all the input fields.');
        if(!req.body.customerName) throw new Error('please fill the customer name field.');
        if(!req.body.companyName) throw new Error('please fill the company name field.');
        if(!req.body.streetAddress) throw new Error('please fill the street Address field.');
        if(!req.body.city) throw new Error('please fill the city field.');
        if(!req.body.zip) throw new Error('please fill the zip field.');
        if(!req.body.phone) throw new Error('please fill the phone.');
        if(!req.body.emailAddress) throw new Error('please fill the email Address.');
        if(!req.body.items) throw new Error('please fill the items field.');
        if(!req.body.subtotal) throw new Error('please fill the subtotal field.');
        if(!req.body.total) throw new Error('please fill the total field.');
        console.log('1');
        const {
            customerName,
            companyName,
            streetAddress,
            city,
            zip,
            phone,
            emailAddress,
            peopleCount,
            functionType,
            items,
            subtotal,
            taxRate,
            tax,
            total
        } = req.body;
        console.log('2');
        const newOrder = new Order({
            customerName,
            companyName,
            streetAddress,
            city,
            zip,
            phone,
            functionType,
            peopleCount,
            emailAddress,
            items,
            subtotal,
            total,
            createdAt: new Date()
        });
        console.log('3');
        const newData = await newOrder.save();
        console.log('4');
        if(!newData) throw new Error('error in creating Order instance please wait and try again.');
        console.log(newData);
        res.status(200).send({
            message: newOrder
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
}



const updateOrderById = async (req, res) => {
    try {
        if(!req.body.id) throw new Error('error in getting id of the Order instance');
        if(!req.body.customerName) throw new Error('please fill the customer name field.');
        if(!req.body.companyName) throw new Error('please fill the company name field.');
        if(!req.body.streetAddress) throw new Error('please fill the street Address field.');
        if(!req.body.city) throw new Error('please fill the city field.');
        if(!req.body.zip) throw new Error('please fill the zip field.');
        if(!req.body.phone) throw new Error('please fill the phone.');
        if(!req.body.emailAddress) throw new Error('please fill the email Address.');
        if(!req.body.items) throw new Error('please fill the items field.');
        if(!req.body.subtotal) throw new Error('please fill the subtotal field.');
        if(!req.body.taxRate) throw new Error('please fill the taxRate field.');
        if(!req.body.tax) throw new Error('please fill the tax field.');
        if(!req.body.total) throw new Error('please fill the total field.');
        const {
            id,
            customerName,
            companyName,
            streetAddress,
            city,
            zip,
            phone,
            emailAddress,
            items,
            subtotal,
            taxRate,
            tax,
            total
        } = req.body;


        const newOrder = await Order.findByIdAndUpdate(id, {
            $set: {
                customerName,
                companyName,
                streetAddress,
                city,
                zip,
                phone,
                emailAddress,
                items,
                subtotal,
                taxRate,
                tax,
                total,
                updatedAt: new Date()
            }
          });
     

        if(!newOrder) throw new Error('error in updating newOrder instance please wait and try again.');

        res.status(200).send({
            message: newOrder
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
}


const getByOrderName = async (req, res, next) => {
    try {
        if(!req.body.itemName) throw new Error('Error in getting item Name');

        const order = await Order.find({"itemName":req.body.itemName});
  
        if(!order) throw new Error('Order not found');
   
        res.status(200).send({
            message: order
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};


const getAllOrder = async (req, res, next) => {
    try {
        const order = await Order.find();
        if(!order) throw new Error('Order not found');
        res.status(200).send({
            message: order
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};

const getByOrderId = async (req, res, next) => {
    try {
        if(!req.body.id) throw new Error('Error in getting Order id');
        const order = await Order.findById(req.body.id);
        if(!order) throw new Error('Order not found');
        res.status(200).send({
            message: order
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    updateOrderById,
    getByOrderName,
    getAllOrder,
    getByOrderId,
}