const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose =require('mongoose');
require('dotenv').config({ path: './.env'});


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@realmcluster.fam4l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.Promise =global.Promise;

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());


app.use((res, req, next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-control-Allow-Headers,Origin, X-requested-with, Content-Type, Accept, Authorization'
    );
    if (req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error, req, res, next) =>{
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
});

module.exports = app;