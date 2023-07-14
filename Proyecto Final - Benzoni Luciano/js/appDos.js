const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
    const respuesta = await fetch("../data.json");
    const data = await respuesta.json();

    data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "carta"
        content.innerHTML = `
            <img src="${product.img}">
            <h5>${product.nombre}</h5>
            <p class="precio">${product.precio} $</p>
        `
        shopContent.append(content)

        let comprar = document.createElement("button")
        comprar.innerText = "Agregar al carrito"
        comprar.className = "botonCarta"

        content.append(comprar);

        comprar.addEventListener("click", () => {

            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);


            if (repeat) {
                carrito.map((prod) => {
                    if (prod.id === product.id) {
                        prod.cantidad++;
                    }
                });
            } else {
                carrito.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                })
                carritoContador();
                almacenamientoLocal();
            }
        })
    })
};

getProducts();


const almacenamientoLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

JSON.parse(localStorage.getItem("carrito"));