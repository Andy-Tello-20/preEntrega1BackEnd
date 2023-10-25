
const express = require("express")

const app = express()

const productsRouter= require ("./routers/products.routers")
const cartsRouter = require("./routers/carts.router.js")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))





app.use('/api', productsRouter, cartsRouter);









app.listen(8080, () => {
    console.log(`Server running in http://localhost:8080 `);
  });