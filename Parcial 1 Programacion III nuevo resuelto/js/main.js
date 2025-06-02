// Lista de frutas con sus datos (id, nombre, precio e imagen)
const frutas = [
  { id: 1, nombre: "Manzana", precio: 30, img: "img/manzana.jpg" },
  { id: 2, nombre: "Banana", precio: 25, img: "img/banana.jpg" },
  { id: 3, nombre: "Naranja", precio: 28, img: "img/naranja.jpg" },
  { id: 4, nombre: "Pera", precio: 32, img: "img/pera.jpg" },
  { id: 5, nombre: "Pomelo amarillo", precio: 45, img: "img/pomelo-amarillo.jpg" },
  { id: 6, nombre: "Frambuesa", precio: 40, img: "img/frambuesa.png" },
  { id: 7, nombre: "Frutilla", precio: 50, img: "img/frutilla.jpg" },
  { id: 8, nombre: "Kiwi", precio: 38, img: "img/kiwi.jpg" },
  { id: 9, nombre: "Ananá", precio: 55, img: "img/anana.jpg" },
  { id: 10, nombre: "pomelo-rojo", precio: 48, img: "img/pomelo-rojo.jpg" },
  { id: 11, nombre: "arandano", precio: 60, img: "img/arandano.jpg" },
  { id: 12, nombre: "Sandía", precio: 65, img: "img/sandia.jpg" },
  { id: 13, nombre: "Mandarina", precio: 22, img: "img/mandarina.jpg" }
];

// Array que guarda los productos que agregues al carrito
let carrito = [];

// Variables para controlar si el ordenamiento será ascendente o descendente
let ordenNombreAsc = true;
let ordenPrecioAsc = true;

/* === Mostrar datos del alumno en consola y en página === */
function imprimirDatosAlumno() {
  // Datos del alumno fijo
  const alumno = { dni: "47342397", nombre: "Tiziano", apellido: "Medina" };
  
  // Muestra por consola los datos del alumno
  console.log(`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);

  // Busca el elemento en HTML donde mostrar el nombre y apellido
  const nombreElemento = document.querySelector(".nombreAlumno");
  if (nombreElemento) {
    // Inserta el nombre completo del alumno en la página
    nombreElemento.innerHTML = `<strong>${alumno.nombre} ${alumno.apellido}</strong>`;
  }
}

/* === Mostrar lista de productos en la pantalla === */
function mostrarProductos(lista = frutas) {
  // Selecciona el contenedor donde se mostrarán los productos
  const contenedor = document.querySelector(".contenedor-productos");
  contenedor.innerHTML = ""; // Limpia el contenido para no repetir

  // Por cada fruta, crea una tarjeta con su imagen, nombre, precio y botón para agregar al carrito
  lista.forEach(fruta => {
    contenedor.innerHTML += `
      <div class="card-producto">
        <img src="${fruta.img}" alt="${fruta.nombre}">
        <h3>${fruta.nombre}</h3>
        <p>$${fruta.precio.toFixed(2)}</p>
        <button onclick="agregarAlCarrito(${fruta.id})">Agregar al carrito</button>
      </div>
    `;
  });
}

/* === Filtrar productos según texto que se escribe en la barra de búsqueda === */
function FiltroBusqueda() {
  const inputBusqueda = document.querySelector(".barra-busqueda");

  // Escucha cuando el usuario escribe algo en el input
  inputBusqueda.addEventListener("input", () => {
    // Convierte texto a minúsculas para no importar mayúsculas o minúsculas
    const texto = inputBusqueda.value.toLowerCase();

    // Filtra las frutas que contengan ese texto en su nombre
    const frutasFiltradas = frutas.filter(fruta => fruta.nombre.toLowerCase().includes(texto));

    // Muestra solo las frutas filtradas en pantalla
    mostrarProductos(frutasFiltradas);
  });
}

/* === Mostrar el carrito con los productos que se agregaron === */
function mostrarCarrito() {
  const contenedorCarrito = document.getElementById("items-carrito");

  // Si el carrito está vacío muestra mensaje
  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>No hay elementos en el carrito.</p>";
    return;
  }

  // Si hay productos, crea una lista con cada producto y botón para eliminar
  let html = "";
  carrito.forEach(item => {
    html += `
      <li class="bloque-item">
        <p class="nombre-item">${item.nombre} - $${item.precio.toFixed(2)} x${item.cantidad}</p>
        <button class="boton-eliminar" onclick="eliminarProducto(${item.id})">Eliminar</button>
      </li>
    `;
  });

  contenedorCarrito.innerHTML = html;
}

/* === Actualiza el contador del carrito y el texto en el header que muestra la cantidad === */
function actualizarContadorCarrito() {
  // Busca los elementos para mostrar la cantidad en el header y en contador (si existen)
  const contadorCarrito = document.getElementById("contador-carrito");
  const carritoHeader = document.querySelector(".carrito");

  // Calcula la suma total de todos los productos en carrito
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Si no hay productos, vacía el carrito
  if (cantidadTotal === 0) {
    carrito = [];
  }

  // Actualiza el texto del carrito en el header (ej: Carrito: 3 productos)
  if (carritoHeader) {
    carritoHeader.textContent = `Carrito: ${cantidadTotal} producto${cantidadTotal !== 1 ? 's' : ''}`;
  }

  // Actualiza el contador visual si existe
  if (contadorCarrito) {
    contadorCarrito.textContent = cantidadTotal;
  }
}

/* === Actualiza el total a pagar según productos y cantidades del carrito === */
function actualizarTotal() {
  // Busca donde mostrar el total y el contenedor del total
  const totalContenedor = document.getElementById("precio-total");
  const totalCarritoDiv = document.querySelector(".total-carrito");

  // Suma todos los precios por cantidad
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  // Si total es 0 oculta el contenedor, sino muestra el total
  if (total === 0) {
    totalCarritoDiv.style.display = "none";
  } else {
    totalCarritoDiv.style.display = "block";
    if (totalContenedor) totalContenedor.textContent = `$${total.toFixed(2)}`;
  }
}

/* === Agrega un producto al carrito === */
function agregarAlCarrito(id) {
  // Busca la fruta por su id en la lista completa
  const fruta = frutas.find(f => f.id === id);

  // Verifica si el producto ya está en el carrito
  const productoEnCarrito = carrito.find(item => item.id === id);

  if (productoEnCarrito) {
    // Si ya está, aumenta la cantidad en 1
    productoEnCarrito.cantidad++;
  } else {
    // Si no está, lo agrega con cantidad 1
    carrito.push({ ...fruta, cantidad: 1 });
  }

  // Guarda el carrito actualizado, actualiza contador, total y muestra carrito
  guardarCarritoLocalStorage();
  actualizarContadorCarrito();
  actualizarTotal();
  mostrarCarrito();
}

/* === Elimina un producto o reduce la cantidad en 1 === */
function eliminarProducto(id) {
  const productoEnCarrito = carrito.find(item => item.id === id);
  if (!productoEnCarrito) return;

  if (productoEnCarrito.cantidad > 1) {
    // Si hay más de 1 unidad, resta 1
    productoEnCarrito.cantidad--;
  } else {
    // Si queda 1, lo elimina del carrito
    carrito = carrito.filter(item => item.id !== id);
  }

  // Actualiza localStorage, contador, total y muestra carrito
  guardarCarritoLocalStorage();
  actualizarContadorCarrito();
  actualizarTotal();
  mostrarCarrito();
}

/* === Guarda el carrito en localStorage para mantener datos si refrescas === */
function guardarCarritoLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* === Carga el carrito desde localStorage si hay datos guardados === */
function cargarCarritoLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  } else {
    carrito = [];
  }
}

/* === Ordena los productos por nombre, alternando entre ascendente y descendente === */
function ordenarPorNombre() {
  const frutasOrdenadas = [...frutas].sort((a, b) => {
    if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return ordenNombreAsc ? -1 : 1;
    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return ordenNombreAsc ? 1 : -1;
    return 0;
  });
  mostrarProductos(frutasOrdenadas);

  // Cambia el sentido del orden para la próxima vez
  ordenNombreAsc = !ordenNombreAsc;
}

/* === Ordena los productos por precio, alternando entre ascendente y descendente === */
function ordenarPorPrecio() {
  const frutasOrdenadas = [...frutas].sort((a, b) => {
    return ordenPrecioAsc ? a.precio - b.precio : b.precio - a.precio;
  });
  mostrarProductos(frutasOrdenadas);

  // Cambia el sentido del orden para la próxima vez
  ordenPrecioAsc = !ordenPrecioAsc;
}

/* === Vacía todo el carrito === */
function vaciarCarrito() {
  carrito = [];  
  guardarCarritoLocalStorage();
  mostrarCarrito();
  actualizarContadorCarrito();
  actualizarTotal();
}

/* === Agrega eventos para botones de ordenar y vaciar carrito === */
function agregarEventosOrdenamiento() {
  const btnNombre = document.getElementById("ordenar-nombre");
  const btnPrecio = document.getElementById("ordenar-precio");
  const btnVaciar = document.getElementById("vaciar-carrito");

  if (btnNombre) btnNombre.addEventListener("click", ordenarPorNombre);
  if (btnPrecio) btnPrecio.addEventListener("click", ordenarPorPrecio);
  if (btnVaciar) btnVaciar.addEventListener("click", vaciarCarrito);
}



/* === Función init === */
function init() {
  imprimirDatosAlumno();
  cargarCarritoLocalStorage();
  mostrarProductos();
  FiltroBusqueda();
  mostrarCarrito();
  actualizarContadorCarrito();
  actualizarTotal();
  agregarEventosOrdenamiento();
}

document.addEventListener("DOMContentLoaded", init);
