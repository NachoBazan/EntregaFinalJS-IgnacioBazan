const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const getproducts = async() => {
    const respuesta = await fetch("./JSON/productos.json")
    const data = await respuesta.json()

    data.forEach((product) => {
        let content = document.createElement("div")
        content.className = "card"
        content.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p class="precio">$ ${product.precio}</p>
    
        `
        shopContent.append(content)
    
        let comprar = document.createElement("button")
        comprar.innerText = "Añadir al carrito"
    
        comprar.className = "comprar"
    
        content.append(comprar)
    
    
        comprar.addEventListener("click", () => {
    
        const repetido =  carrito.some((repetidoProduct) => repetidoProduct.id === product.id)
        
        if (repetido){
            carrito.map((prod) => {
                if (prod.id === product.id){
                    prod.cantidad++
                }
            })
        }else{
            carrito.push({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                img: product.img,
                cantidad: product.cantidad
            })
            carritoCounter()
            saveLocal()
        }
        })
    })
}
getproducts()


const saveLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito))}




