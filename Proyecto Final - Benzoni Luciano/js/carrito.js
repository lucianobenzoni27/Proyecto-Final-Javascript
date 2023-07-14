const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
    <h1 class="modal-header-titulo">Carrito</h1>
    <h1 class="modal-header-button">x</h1>
  `;
  modalContainer.append(modalHeader);

  const modalButton = modalHeader.querySelector(".modal-header-button");
  modalButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  carrito.forEach((product) => {
    const carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p>${product.precio} $</p>
      <span class="restar">-</span>
      <p>Cantidad: ${product.cantidad}</p>
      <span class="sumar">+</span>
      <p>Total: ${product.cantidad * product.precio}</p>
      <span class="eliminar">❌</span>
    `;

    modalContainer.append(carritoContent);

    const restar = carritoContent.querySelector(".restar");
    restar.addEventListener("click", () => {
      if (product.cantidad > 1) {
        product.cantidad--;
      }
      almacenamientoLocal();
      pintarCarrito();
    });

    const sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      almacenamientoLocal();
      pintarCarrito();
    });

    const eliminar = carritoContent.querySelector(".eliminar");

    eliminar.addEventListener("click", ()=> {
        eliminarProducto(product.id);
        carritoContador();
        almacenamientoLocal();
        pintarCarrito();
    })
      
    
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  const totalCompra = document.createElement("div");
  totalCompra.className = "total-content";
  totalCompra.innerHTML = `
                          <p>Total a pagar: ${total} $ </p>
                          <button class="finalizar_compra">Finalizar Compra</button>`;
  modalContainer.append(totalCompra);

  const finalizar_compra = totalCompra.querySelector(".finalizar_compra");
  finalizar_compra.addEventListener("click", () => {
    if(total != 0){
      Swal.fire({
        icon: 'success',
        title: 'Tu compra ha sido finalizada',
        confirmButtonText: 'Continuar'
      })
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Agrega productos al carrito para finalizar la compra',
        icon: 'error',
        confirmButtonText: 'Continuar'
      })
    }
  });

  modalContainer.append(finalizar_compra);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);
  
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
  
  };
  
  const carritoContador = () => {
    cantidadCarrito.style.display = "block";
  
    const carritoLength = carrito.length;
  
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
  };
  
  carritoContador();