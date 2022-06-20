const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/connectDB');
const port = process.env.PORT || 4000
const app = express();

app.use(bodyParser.json({ extended: true, limit: '30mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb'}));
app.use(helmet())
app.use(cors())
app.use(morgan("combined"));

app.use("/", (req, res) => {
    res.send("Xin chao")
})
connectDB()
app.listen(port, () => console.log(`App started on http://localhost:${port}`));
