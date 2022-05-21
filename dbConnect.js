const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://leadadmin:MArtmsb2020@cluster0.tpyu0.mongodb.net/?retryWrites=true&w=majority' , {useNewUrlParser : true , useUnifiedTopology : true})

const connection = mongoose.connection

connection.on('error', err => console.log(err))

connection.on('connected' , () => console.log('Mongo DB Connection Successfull'))