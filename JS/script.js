// MENU MOVIL

const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => {

    nav.classList.toggle("active");

});




// SLIDER EQUIPOS

const equipment = document.querySelectorAll(".equipment");

let current = 0;

function changeEquipment() {

    equipment[current].classList.remove("active");

    current++;

    if (current >= equipment.length) {

        current = 0;

    }

    equipment[current].classList.add("active");

}

setInterval(changeEquipment, 4000);