const path = require('path');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res, next) => {
    return res.status(200).json({
        message: "Welcome to api portal"
    })
})

const cookieParser = require("cookie-parser");
//   const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./route/userCreate");

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

//  ROUTES
app.use("/api/v1/user", userRouter);



app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find the ${req.url} on this server!`,
  });
});


app.use(function (error, req, res, next) {
    if (error.status) {
        return res.status(error.status).json({
            errorName: error.name,
            message: error.message
        })
    } else {
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
})

module.exports = app;