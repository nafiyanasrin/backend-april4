const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    items: [{
        itemTypes:{
        type: String,
        },
        itemPrice: {
            type: Number,
        }
    }],
    createdAt: {
        type: mongoose.Schema.Types.Date
    },
    updatedAt: {
        type: mongoose.Schema.Types.Date
    },
},
{
    collection: 'stock'
});

module.exports = mongoose.model('Stock',stockSchema);

