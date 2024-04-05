import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
//import managementRoutes from "./routes/management.js";
//import salesRoutes from "./routes/sales.js";

import Product from "./models/Product.js";
import User from "./models/User.js";
import {
  dataProduct,
  dataUser
} from "./data/index.js";


// configuration
dotenv.config();
const app = express();
app.use( express.json() );
app.use( helmet());
app.use( helmet.crossOriginResourcePolicy( {policy : "cross-origin"} ));
app.use( morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false}));
app.use(cors());

// Routes
app.use( "/client", clientRoutes);
app.use( "/general", generalRoutes);
//app.use( "management", managementRoutes);
//app.use( "sales", salesRoutes);

// mongoose setup
const uri = "mongodb+srv://anilkanhasoft:123@cluster0.12fko2j.mongodb.net/mearndashboard?retryWrites=true&w=majority";

const PORT = process.env.PORT || 9000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});

mongoose
    .connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server Port conn: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    //Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    //User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));

