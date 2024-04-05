const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes/index.js');


require('dotenv').config();
const port = process.env.PORT;

mongoose.connect(`${process.env.MONGODB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});




const app = express();
app.use(express.json());
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));


app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true
  })
)

app.use((req,res,next) => {

  console.log(req.method, req.url);
   console.log(res.statusCode);
   console.log(req.body);
   next();
})


app.use('/',userRoutes);
// app.use('/admin',adminRoutes);

app.listen(port, () => {
   console.log('server is running:',port)
});




