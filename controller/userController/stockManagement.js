const Stock = require('../../models/stock');


const createStock = async (req, res) => {
    try {
        if(!req.body) throw new Error('please fill all the input fields.');
        if(!req.body.itemName) throw new Error('please fill the name field.');
        if(!req.body.items) throw new Error('there is an error in identifying the item Types please try again later.');
        console.log('1');
        const {
            itemName,
            items,
        } = req.body;
        console.log('2');
        const newStock = new Stock({
            itemName,
            items,
            createdAt: new Date()
        });
        console.log('3');
        const newData = await newStock.save();
        console.log('4');
        if(!newData) throw new Error('error in creating Stock instance please wait and try again.');
        console.log(newData);
        res.status(200).send({
            message: newStock
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
}



const updateStockById = async (req, res) => {
    try {
        if(!req.body.id) throw new Error('error in getting id of the stock instance');
        if(!req.body.itemName) throw new Error('please fill the name field.');
        if(!req.body.items) throw new Error('there is an error in identifying the item Types please try again later.');
        const {
            id,
            itemName,
            items,
        } = req.body;


        const newStock = await Stock.findByIdAndUpdate(id, {
            $set: {
                itemName,
                items,
                updatedAt: new Date()
            }
          });
     

        if(!newStock) throw new Error('error in updating newStock instance please wait and try again.');

        res.status(200).send({
            message: newStock
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
}


const getByStockName = async (req, res, next) => {
    try {
        if(!req.body.itemName) throw new Error('Error in getting item Name');
        console.log('1');
        const stock = await Stock.find({"itemName":req.body.itemName});
        console.log('2');
        if(!stock) throw new Error('Stock not found');
        console.log('3');
        res.status(200).send({
            message: stock
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};



const getAllStock = async (req, res, next) => {
    try {
        const Stocks = await Stock.find();
        if(!Stocks) throw new Error('Stock not found');
        res.status(200).send({
            message: Stocks
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};

const getByStockId = async (req, res, next) => {
    try {
        if(!req.body.id) throw new Error('Error in getting stock id');
        const stock = await Stock.findById(req.body.id);
        if(!stock) throw new Error('Stock not found');
        res.status(200).send({
            message: stock
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
};







module.exports = {
    createStock,
    updateStockById,
    getByStockName,
    getAllStock,
    getByStockId,
}