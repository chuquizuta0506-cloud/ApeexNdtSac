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

//PARA CORRELATIVO DEL FORMULARIO A CORREO

document.addEventListener("DOMContentLoaded", function () {
    const fechaInput = document.getElementById("fecha");
    const horaInput = document.getElementById("hora");
    const codigoInput = document.getElementById("codigo");
    const form = document.getElementById("form-reclamaciones");

    function completarFechaHora() {
        const ahora = new Date();

        const dia = String(ahora.getDate()).padStart(2, "0");
        const mes = String(ahora.getMonth() + 1).padStart(2, "0");
        const anio = ahora.getFullYear();

        const horas = String(ahora.getHours()).padStart(2, "0");
        const minutos = String(ahora.getMinutes()).padStart(2, "0");
        const segundos = String(ahora.getSeconds()).padStart(2, "0");

        fechaInput.value = `${dia}/${mes}/${anio}`;
        horaInput.value = `${horas}:${minutos}:${segundos}`;
    }

    function generarCodigoVisual() {
        let ultimoNumero = localStorage.getItem("apeex_reclamo_correlativo");

        if (!ultimoNumero) {
            ultimoNumero = 0;
        }

        const siguienteNumero = parseInt(ultimoNumero, 10) + 1;
        const correlativo = String(siguienteNumero).padStart(6, "0");

        codigoInput.value = `APEEX-LR-${correlativo}`;
    }

    completarFechaHora();
    generarCodigoVisual();

    setInterval(completarFechaHora, 1000);

    form.addEventListener("submit", function () {
        let ultimoNumero = localStorage.getItem("apeex_reclamo_correlativo");

        if (!ultimoNumero) {
            ultimoNumero = 0;
        }

        const siguienteNumero = parseInt(ultimoNumero, 10) + 1;
        localStorage.setItem("apeex_reclamo_correlativo", siguienteNumero);
    });
});

// PARA CONTACTANOS


//PARA ENVIAR FORMULARIO CONTACTANOS CON MENSAJE DE EMERGENTE PRO

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-contacto");
    const mensajeExito = document.getElementById("mensaje-exito");
    const boton = document.getElementById("btn-enviar-contacto");

    if (form && mensajeExito && boton) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            boton.disabled = true;
            boton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

            const formData = new FormData(form);

            try {
                const response = await fetch("https://formsubmit.co/ajax/APEEXNDTSAC@gmail.com", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    form.reset();
                    mensajeExito.classList.remove("oculto");
                    alert("Gracias por comunicarse con nosotros. Su formulario fue enviado con éxito.");
                } else {
                    alert("No se pudo enviar el formulario. Por favor, inténtelo nuevamente.");
                    console.error(data);
                }
            } catch (error) {
                alert("Ocurrió un error al enviar el formulario. Verifique su conexión e inténtelo otra vez.");
                console.error(error);
            } finally {
                boton.disabled = false;
                boton.innerHTML = '<i class="fa-solid fa-envelope"></i> Enviar consulta';
            }
        });
    }
});