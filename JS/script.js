// MENU MOVIL
const toggle = document.getElementById("menu-toggle");
const menu = document.querySelector(".menu");

if (toggle && menu) {
    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}

// SLIDER EQUIPOS
const equipment = document.querySelectorAll(".equipment");

if (equipment.length > 0) {
    let current = 0;

    function changeEquipment() {
        equipment[current].classList.remove("active");
        current = (current + 1) % equipment.length;
        equipment[current].classList.add("active");
    }

    setInterval(changeEquipment, 4000);
}

// MENU ACTIVO
const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(link => {
    link.addEventListener("click", function () {
        menuLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
    });
});

// CARRITO
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

    if (!lista || !totalTexto || !contador) return;

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
    window.open("https://wa.me/51989848075?text=" + mensaje);
}

function toggleCarrito() {
    const panel = document.getElementById("carrito-panel");
    if (panel) {
        panel.classList.toggle("active");
    }
}

function eliminarProducto(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
}

// FORMULARIO WHATSAPP
const formWhatsapp = document.getElementById("form-whatsapp");

if (formWhatsapp) {
    formWhatsapp.addEventListener("submit", function (e) {
        e.preventDefault();

        let nombre = document.getElementById("nombre").value;
        let email = document.getElementById("email").value;
        let telefono = document.getElementById("telefono").value;
        let mensaje = document.getElementById("mensaje").value;

        let texto = "Hola, quiero información desde la web APEEX:%0A%0A"
            + "Nombre: " + nombre + "%0A"
            + "Email: " + email + "%0A"
            + "Teléfono: " + telefono + "%0A"
            + "Mensaje: " + mensaje;

        let numero = "51989848075";
        let url = "https://wa.me/" + numero + "?text=" + texto;

        window.open(url, "_blank");
    });
}