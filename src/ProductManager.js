const fs = require("fs")



class ProductManager {



    constructor(path) {
        this.path = path
    }
   
    async addProduct(data) {

        const { title, description, price, thumbnail, code, stock,category,id } = data
        //validamos (por las dudas)
        if (!title || !description || !code || !price || !stock || !category || !thumbnail) {
            console.error('Todos los campos son obligatorios')
            return
        }

        //Antes de adherir un nuevo producto necesito saber si ya existe un archivo 

        const existFile = await request(this.path)
        const newProduct = {
            id,
            title,
            description,
            code,
            price,
            status:true,
            stock,
            category,
            thumbnail,
            
        }


        //el archivo ya tendria el nuevo contenido disponible pára ingresar
        existFile.push(newProduct)

        //guardar el archivo

        await saveinFile(this.path, existFile)



    }

    async getProducts() {
        // si request es una promesa debemos llamar a (getProducts) como una funcion asincrona utilizando "await" para esperar 

        const mostrarProductos = await request(this.path)
        return mostrarProductos
    }


    async getProductById(id) {

        const NewId=(id)

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

    async updateProduct(id, campo) {

        console.log(id)
        const lectura = await request(this.path)

        const buscarIndice = lectura.findIndex((i) => {
            return i.id == id
        })

      
        console.log(campo.category)


        console.log(lectura[buscarIndice].category)


        
        lectura[buscarIndice].title = campo.title
        lectura[buscarIndice].description = campo.description
        lectura[buscarIndice].price = campo.price
        lectura[buscarIndice].code = campo.code
        lectura[buscarIndice].stock = campo.stock
        lectura[buscarIndice].category = campo.category
        lectura[buscarIndice].thumbnail = campo.thumbnail


        
        console.log("se ha cambiado el titulo del producto 😎")
        

        await saveinFile(this.path, lectura)


    }

    async deleteProduct(id) {

        const lectura = await request(this.path)
        const buscarIndicePorID = lectura.findIndex((i) => {
            return i.id == id
        })
        if (buscarIndicePorID) {
            lectura.splice([buscarIndicePorID], 1)
            console.log("se ha eliminado un producto")
        }
        await saveinFile(this.path, lectura)


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


module.exports=ProductManager