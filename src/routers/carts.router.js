const { Router } = require("express")
const { v4: uuidV4 } = require('uuid')

const router = Router()

const CartManager = require("../CartManager")


const carrito = new CartManager("./carrito.json")


router.post('/carts', async (req, res) => {

    try {
        const newCart = {
            id: uuidV4(),
            products: []
        }

        await carrito.addProduct(newCart)

        res.status(201).json(newCart)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }


})


router.get('/carts/:cid', async (req, res) => {

    try {
        const idcart = req.params.cid

        if (idcart) {


            const showCart = await carrito.getProductById(idcart)

            res.status(201).json(showCart)

        } else {
            res.send({ error: 'No se proporcionó un PID válido' })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }

})


router.post('/carts/:cid/product/:pid', async (req, res) => {

    try {
        const carritoId = req.params.cid
        const productoId = req.params.pid

        const productoEncontrado = await carrito.postBydIdProduct(carritoId, productoId)

        return res.json(productoEncontrado)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})



module.exports = router