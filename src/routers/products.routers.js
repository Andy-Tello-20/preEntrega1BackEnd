const { Router } = require("express")
const { v4: uuidV4 } = require('uuid')

const router = Router()

const ProductManager = require("../ProductManager")


const product3 = new ProductManager("./products.json")




router.get('/products', async (req, res) => {

    try {

        const { limit } = req.query
        const products = await product3.getProducts()

        // lo que se hace es que, si existe el parametro "limit" y no es falsy, se mostrara con el metodo slice DESDE el primer elemento de products2. HASTA el valor que se reciba por "limits"

        if (limit) {
            const limitedProduct = products.slice(0, limit)
            res.json(limitedProduct)
        } else {
            res.json(products)
        }



    } catch (error) {
        res.json({ error: 'Error al obtener los productos' })
    }
})


router.get('/products/:pid', async (req, res) => {

    try {
        const { pid } = req.params

        if (pid) {

            const productById = await product3.getProductById(pid)

            res.json(productById)

        } else {
            res.send({ error: 'No se proporcionó un PID válido' })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }

})


router.post('/products', async (req, res) => {

    try {
        const { body } = req

        const newProduct = {

            ...body,
            id: uuidV4(),

        }


        await product3.addProduct(newProduct)


        res.status(201).json(newProduct)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }

})


router.put('/products/:pid', async (req, res) => {

    try {
        const { body } = req
        const idReq = req.params.pid



        const allProperties = {
            ...body
        }

        await product3.updateProduct(idReq, allProperties)

        res.json(allProperties)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

router.delete('/products/:pid', async (req, res) => {

    try {
        const deleteId = req.params.pid

        await product3.deleteProduct(deleteId)


        res.status(200).json({ message: "Se ha eliminado un producto" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }


})





module.exports = router