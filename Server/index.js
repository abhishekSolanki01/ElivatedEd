const express = require('express');
const app = express();
const mongoose = require("mongoose")

const cors = require("cors");



//
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')



const CONNECTION_STRING = `mongodb+srv://abhishek:12345@cluster0.pcghker.mongodb.net/?retryWrites=true&w=majority`


app.use(cors())
app.use(express.json());



app.use('/admin', adminRoutes);
app.use('/users', userRoutes)


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });
