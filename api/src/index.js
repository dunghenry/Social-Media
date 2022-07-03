const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/connectDB');
const port = process.env.PORT || 4000;
const routes = require('./routes');

//! config cors production
const listURL = ['http://127.0.0.1:5500', 'http://localhost:3000'];
const cookieParser = require("cookie-parser");
// const corsOptions = {
//     origin: (origin, callback) => {
//       if (listURL.indexOf(origin) !== -1) {
//         callback(null, true)
//       } else {
//         callback(new Error())
//       }
//     }
//   }

//?config cors development
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ extended: true, limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(helmet());
app.use(morgan("dev"));

//connect DB
connectDB();

//routes
routes(app);

app.listen(port, () => console.log(`App started on http://localhost:${port}`));
