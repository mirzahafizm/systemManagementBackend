const express = require('express');
const cors = require('cors');
const routes = require('../routes');
const morgan = require('morgan');
const errorHandler = require('../helper/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.options('*', cors());
app.use(morgan("dev"));

app.use("/api/v1", routes);
app.use(errorHandler)

module.exports = app;
