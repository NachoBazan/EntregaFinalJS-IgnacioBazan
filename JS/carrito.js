const pintarCarrito = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div")
    modalHeader.className  = "modal-header"
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Mi carrito</h1>
    `
    modalContainer.append(modalHeader)

    const modalButton = document.createElement("h1")
    modalButton.innerText = "x"
    modalButton.className = "modal-header-button"

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none"
    })

    modalHeader.append(modalButton)

    carrito.forEach((product) =>{
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>$ ${product.precio}</p>
        <p>Cantidad: ${product.cantidad}</p>
        <p>Total: ${product.cantidad*product.precio} USD</p>
        <span class="delete-product"> ❌ </span>
        `
        modalContainer.append(carritoContent)

        let eliminar = carritoContent.querySelector(".delete-product")
        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id)
        })

    })
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)

    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `Total a pagar: $ ${total} usd`

    modalContainer.append(totalBuying)

    
    const buy = document.createElement("button")
    buy.className = "buy-button"
    buy.innerHTML = "Comprar"
    modalContainer.append(buy)

    buy.addEventListener("click", () => {
        Swal.fire({
            title: '¿Quieres comprar estos productos?',
            text: `El total de su compra es de $ ${total} usd`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Comprar',
            cancelButtonText: "Volver al carrito" 
          }).then((result) => {
            if (result.isConfirmed) {
              if (carrito.length === 0){
                Swal.fire({
                    icon: 'error',
                    title: 'No ha ingresado ningún producto',
                    confirmButtonText: 'Volver',
                    confirmButtonColor: '#d33'
                  })
              } else{ 
                Swal.fire(
                    'Gracias por su compra',
                    'Su compra se ha realizado con exito!',
                    'success'
                )
                vaciarCarrito()
                pintarCarrito()
                saveLocal()
                carritoCounter()
                }
            }
          })
    })
}

verCarrito.addEventListener("click", pintarCarrito)

const eliminarProducto = (id) => {
    const EncontrarID = carrito.find((obj)=> obj.id === id)
    carrito = carrito.filter((carritoID)=> {
        return carritoID !== EncontrarID
    })
    carritoCounter()
    saveLocal()
    pintarCarrito()
}

const carritoCounter = () => {
    cantidadCarrito.style.display = "block"

    const carritoLength = carrito.length

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
}

function vaciarCarrito() {
    carrito = [];
}
    
carritoCounter()
