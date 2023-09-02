let data;
/* --------------------------- VARIABLES GLOBALES --------------------------- */
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* -------------------------------- FUNCIONES ------------------------------- */
const mostrarProductos = (productos) => {
	const contenedorProductos = document.querySelector(".product-list");
	contenedorProductos.innerHTML = "";

	productos.forEach((producto) => {
		const li = document.createElement("li");
		li.innerHTML = `
            <h3>${producto.nombre}</h3>
			<img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
            <p class="product-description">${producto.descripcion}</p>
            <p class="product-price">$${producto.precio}</p>
            <button id="agregar-${producto.id}" class="add-to-cart">Agregar al carrito</button>
        `;
		contenedorProductos.appendChild(li);

		const boton = document.getElementById(`agregar-${producto.id}`);
		boton.addEventListener("click", () => {
			agregarAlCarrito(productos, producto.id);
		});
	});
};

const mostrarCarrito = () => {
	const contenedorCarrito = document.querySelector(".carrito");
	contenedorCarrito.innerHTML = "";

	if (carrito.length > 0) {
		const productsCart = document.createElement("ul");
		productsCart.classList.add("productsCart");
		contenedorCarrito.appendChild(productsCart);

		const contenedorTotal = document.createElement("p");
		actualizarTotal(contenedorTotal);
		contenedorCarrito.appendChild(contenedorTotal);

		carrito.forEach((producto) => {
			const li = document.createElement("li");
			li.innerHTML = `
                <div class="productContent">
                    <h3>${producto.nombre}</h3>
                    <p class="product-description">${producto.descripcion}</p>
                    <p class="product-price">$${producto.precio}</p>
                    <div class="counter">
                        <button id="decrementar-${producto.id}" class="button">-</button>
                        <span class="product-price">${producto.cantidad}u.</span>
                        <button id="incrementar-${producto.id}" class="button">+</button>
                    </div>
                </div>
                <button id="eliminar-${producto.id}" class="remove">Eliminar</button>
            `;
			productsCart.appendChild(li);

			const boton = document.getElementById(`eliminar-${producto.id}`);
			boton.addEventListener("click", () => {
				eliminarProducto(producto.id);
			});

			const decrementar = document.getElementById(`decrementar-${producto.id}`);
			decrementar.addEventListener("click", () => {
				decrementarProducto(producto.id);
			});

			const incrementar = document.getElementById(`incrementar-${producto.id}`);
			incrementar.addEventListener("click", () => {
				incrementarProducto(producto.id);
			});
		});
	} else {
		contenedorCarrito.innerHTML = '<p class="empty">No hay productos</p>';
	}
};
// FUNCIÓN PARA AGREGAR EL PRODUCTO AL CARRITO

const agregarAlCarrito = (productos, id) => {
	// Si el producto no está en el carrito, lo agregamos
	if (!carrito.some((producto) => producto.id === id)) {
		// Buscamos el producto en el array de productos
		const producto = productos.find((producto) => producto.id === id);
		// Agregamos un nuevo objeto con el contenido del producto y un campo cantidad en 1. Para más información sobre spread operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
		carrito.push({ ...producto, cantidad: 1 });
	} else {
		// Si el producto está en el carrito, lo buscamos y le incrementamos las unidades
		const producto = carrito.find((producto) => producto.id === id);
		producto.cantidad++;
	}
	// Guardamos el carrito en el localStorage para tenerlo actualizado si recargamos la página porque hicimos cambios
	localStorage.setItem("carrito", JSON.stringify(carrito));
	// Actualizamos la vista del carrito porque hemos hecho cambios
	mostrarCarrito();
};
const decrementarProducto = (id) => {
	const producto = carrito.find((prod) => prod.id === id);
	if (producto.cantidad === 1) {
		eliminarProducto(producto.id);
	} else {
		producto.cantidad--;
		localStorage.setItem("carrito", JSON.stringify(carrito));
		mostrarCarrito();
	}
};

const incrementarProducto = (id) => {
	const producto = carrito.find((prod) => prod.id === id);
	producto.cantidad++;
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
};

const eliminarProducto = (id) => {
	carrito = carrito.filter((producto) => producto.id !== id);
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
};

const actualizarTotal = (contenedor) => {
	const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
	contenedor.textContent = `Total: $${total}`;
};

/* --------------------------------- LÓGICA --------------------------------- */
// Cargamos los productos desde el archivo JSON
fetch("./productos.json")
	.then((response) => response.json())
	.then((productos) => {
		data = productos; 
		// Luego de cargar los productos, mostramos la lista de productos y el carrito
		mostrarProductos(productos);
		mostrarCarrito();

		// Ahora puedes usar la variable "productos" para acceder a los datos
		// en otras funciones si es necesario
	});



