// MENU MOVIL
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const menu = document.querySelector(".menu");

toggle.addEventListener("click", () => {

    menu.classList.toggle("active");

});


// SLIDER EQUIPOS

const equipment = document.querySelectorAll(".equipment");

let current = 0;

function changeEquipment() {

    equipment[current].classList.remove("active");

    current = (current + 1) % equipment.length;

    equipment[current].classList.add("active");

}

setInterval(changeEquipment, 4000);

// MENU ACTIVO

// MENU ACTIVO

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(link => {

    link.addEventListener("click", function () {

        menuLinks.forEach(l => l.classList.remove("active"));

        this.classList.add("active");

    });

});

//CARRITO
let carrito = [];
let total = 0;

function agregarCarrito(nombre, precio) {

    carrito.push({ nombre, precio });

    total += precio;

    actualizarCarrito();

}

function actualizarCarrito() {

    const lista = document.getElementById("lista-carrito");
    const totalTexto = document.getElementById("total");
    const contador = document.getElementById("contador-carrito");

    lista.innerHTML = "";

    carrito.forEach((item, index) => {

        const li = document.createElement("li");

        li.classList.add("item-carrito");

        li.innerHTML = `
        ${item.nombre} - $${item.precio}
        <button class="eliminar" onclick="eliminarProducto(${index})">X</button>
        `;

        lista.appendChild(li);

    });

    totalTexto.textContent = "Total: $" + total;

    contador.textContent = carrito.length;
}

function comprarWhatsapp() {

    let mensaje = "Hola, quiero comprar:%0A";

    carrito.forEach(item => {

        mensaje += item.nombre + " - $" + item.precio + "%0A";

    });

    mensaje += "%0ATotal: $" + total;

    window.open("https://wa.me/51951264490?text=" + mensaje);

}

// FUNCION ABRIR Y CERRAR CARRITO
function toggleCarrito() {
    const panel = document.getElementById("carrito-panel");
    panel.classList.toggle("active");
}

//ELIMINAR PRODUCTO DEL CARRITO
function eliminarProducto(index) {

    total -= carrito[index].precio;

    carrito.splice(index, 1);

    actualizarCarrito();

}

//FUNCION CERRAR CARRITO