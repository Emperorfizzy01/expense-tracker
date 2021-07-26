const Transaction = require('../models/Transaction')

// @desc  GET all transactions
// @route /api/transaction
exports.getTransactions = async(req, res, next) => {
    try {
        const transactions = await Transaction.find()

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// @desc  ADD transaction
// @route /api/transaction
exports.addTransactions = async(req, res, next) => {
    try {
        const { text, amount } = req.body;
        const transaction = await new Transaction(req.body).save()

        return res.status(201).json({
            success: true,
            data: transaction
        }) 
   } catch(err) {
     if(err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);

        return res.status(400).json({
            success: false,
            error: messages
        })
     } else {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
     }
   }
}


// @desc  DELETE transaction
// @route /api/transaction/:id
exports.deleteTransactions = async(req, res, next) => {
    try {
       const deleteTransaction = await Transaction.findById(req.params.id);
       

       if(!deleteTransaction) {
           return res.status(404).json({
               success: false,
               error: 'No transaction found'
           })
       } else {
           await deleteTransaction.remove()

           return res.status(200).json({
               status: true,
               data: {}
           })
       }
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}