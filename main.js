function pedirProducto(nombreProducto, data) {
    let productoEncontrado = data.find(item => item.nombre === nombreProducto);
    console.log("productoEncontrado:", productoEncontrado);
    return productoEncontrado;
}

const formularioAgregar = document.getElementById("formulario-agregar");
const inputNombreProducto = document.getElementById("nombreProducto");
const contenedorCarrito = document.querySelector(".carrito");

formularioAgregar.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombreProducto = inputNombreProducto.value;
    const producto = pedirProducto(nombreProducto, data); // Pasa "data" como argumento
    
    if (producto) {
        agregarAlCarrito(producto);
        mostrarCarrito();
        alert("¡Su producto se añadió correctamente! ¿Desea seguir comprando?");
    } else {
        alert("Producto no encontrado. Por favor, ingrese un producto válido");
    }

    inputNombreProducto.value = "";
});









