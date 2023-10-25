const fs = require("fs")



class CartManager {



    constructor(path) {
        this.path = path
    }

    async addProduct(data) {

        const { products } = data

        //validamos (por las dudas)

        if (!products) {
            console.error('Todos los campos son obligatorios')
            return
        }

        //Antes de adherir un nuevo producto necesito saber si ya existe un archivo 

        const existFile = await request(this.path)

        //el archivo ya tendria el nuevo contenido disponible pára ingresar
        existFile.push(data)

        //guardar el archivo

        await saveinFile(this.path, existFile)



    }

    async getProducts() {
        // si request es una promesa debemos llamar a (getProducts) como una funcion asincrona utilizando "await" para esperar 

        const mostrarProductos = await request(this.path)
        return mostrarProductos
    }

    async postBydIdProduct(id, idProducto) {

        const NewId = (id)

        const lectura = await request(this.path)

        // buscarPorId es el array de un NUEVO CARRITO en particular
        const buscarPorID = lectura.find((i) => {

            return i.id === NewId
        })

        if (buscarPorID) {
            console.log("array PRODUCTS:", buscarPorID)


            console.log("los resultados de productos existentes fueron", buscarPorID.products)

            //productoExistente es el array "products" que se encuentra en dicho nuevoCarrito

            const productoExistente = [...buscarPorID.products]

            // busqueda es un array que puede tener o no las propiedades {product y quantity}

            const busqueda = productoExistente.find((i) => { return i.product === idProducto })




            if (busqueda) {
                busqueda.quantity++
            } else {
                // Si product no existe, agregarlo con cantidad 1 por defecto 
                buscarPorID.products.push({ product: idProducto, quantity: 1 })


            }

            await saveinFile(this.path, lectura)
            return buscarPorID.products

        } else {
            let mensaje = "no se encontro ningun producto 😪"
            return mensaje
        }



    }




    async getProductById(id) {

        const NewId = (id)

        const lectura = await request(this.path)
        const buscarPorID = lectura.find((i) => {

            return i.id === NewId
        })

        if (buscarPorID) {
            console.log("el producto encontrado fue:", buscarPorID)

            //Si no lo retornaba nunca lo iba a ver en la pantalla del navegador 🤦‍♂️
            return buscarPorID

        } else {
            let mensaje = "no se encontro ningun producto 😪"
            return mensaje
        }

    }



}

// para comprender el resultado de "request". El valor de request puede ser un array vacío [] si el archivo no existe, o una promesa que se resolverá con el contenido del archivo en formato JSON si el archivo existe.

const request = async (path) => {
    //si no existe retorna un array vacio
    if (!fs.existsSync(path)) {
        return []

    } else {
        // si existe, lee el archivo existente y retorna su contenido en formato JSON (parse= un objeto dentro de un array)
        try {
            const content = await fs.promises.readFile(path, 'utf-8')
            return JSON.parse(content)
        } catch (error) {
            console.log("ha ocurrido un error", error)
        }
    }
}

const saveinFile = async (path, data) => {
    const content = JSON.stringify(data, null, '\t')
    try {
        await fs.promises.writeFile(path, content, 'utf-8')
        console.log("Se han guardado los cambios")
    } catch (error) {
        console.log("ha ocurrido un error", error)
    }

}


module.exports = CartManager