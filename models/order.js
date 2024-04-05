const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    peopleCount: {
        type: Number,
    },
    functionType: {
        type: String,
    },
    phone: {
        type: Number,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
    },
    items:[
        {
           itemName: {
               type: String,
               required: true
           },
           itemTypes: {
               type: String,
           },
           itemPrice: {
               type: Number,
           },
           itemQuantity: {
            type: Number,
           },
           amount: {
            type: Number,
           }
        }
    ],
    subtotal: {
        type: Number,
    },
    taxRate: {
        type: Number,
    },
    tax: {
        type: Number,
    },
    total: {
        type: Number,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date
    },
    updatedAt: {
        type: mongoose.Schema.Types.Date
    },
},
{
    collection: 'order'
});

module.exports = mongoose.model('Order',orderSchema);

