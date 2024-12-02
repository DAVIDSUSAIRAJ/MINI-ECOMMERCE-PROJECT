const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path:path.join(__dirname,"config","config.env")})
const mongoose = require("mongoose")
const app  = express();
const cors = require("cors");


// app.use((req,res,next)=>{
//     next();
// })

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`${process.env.PORT} server is running and mongodb conneced.`);
    })
}).catch((error)=>console.log(error))
const productsRoute = require("./routers/productsRouter");
const ordersRoute = require("./routers/ordersRouter");


app.use("/ecommerce_prod/products",productsRoute)
app.use("/ecommerce_prod/orders",ordersRoute)
// app.use("/databaseName/collectionName",taskRoute)
//if databaseName is not there monogoose will create a database with the name of collectionName