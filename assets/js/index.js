// Crear un programa en Javascript que realice lo siguiente:
// Debe pedirle al usuario que intente adivinar el número secreto por prompt o por input, dicho número será del 1 al 100.
// Si el usuario no adivina el número secreto, debe mostrar un mensaje por consola o DOM diciendo: “Ups, el número secreto es incorrecto, vuelve a intentarlo. ” y volver a solicitarle que ingrese un número.
// Si el usuario adivina el número secreto debe de mostrar un mensaje por consola o DOM diciendo: “Felicidades, adivinaste el número secreto”. Además debe imprimir por consola o DOM la lista de números introducidos antes de adivinar el número secreto.
// El número secreto puede ser definido manualmente o generar un número aleatorio, pero recuerda que debe ser del 1 al 100.
// Debe ser capaz de identificar si el dato de entrada es de tipo number, en caso contrario debe mandar un mensaje de error y volver a solicitar el dato.

const adivinarBtn = document.getElementById("number-btn");
const optionButtons = document.querySelectorAll('.option-btn');
const numberInput = document.getElementById("number-input");
const numberContainer = document.getElementById("number-input-container");
// Variables globales
let selectedValue = null; // Variable accesible desde todo el archivo
let attempts = 0; // Número de intentos permitidos
let secretNumber = null; // Número secreto
let guessedNumbers = []; // Números ingresados por el usuario
let currentAttempt = 0; // Intentos actuales

optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Quitar la clase 'selected' de todos los botones
        optionButtons.forEach(b => b.classList.remove('selected'));

        // Agregar clase 'selected' al botón presionado
        btn.classList.add('selected');

        // Puedes usar el valor seleccionado si quieres usarlo después
        selectedValue = btn.getAttribute('data-value');
    });
});

// funciones originales
function solicitarNumero() {
    let userNum = numberInput.value; // Obtener el valor del input
    numberInput.value = ""; // Limpiar el input después de obtener el valor
    if (isNaN(userNum)|| userNum === "") {
        // Si el valor no es un número o está vacío, mostrar un mensaje de error
        alertSweet("Por favor, ingresa un número válido.", "error");
        return null;
    }
    userNum = parseInt(userNum);
    if (userNum < 1 || userNum > 100) {
        alertSweet("El número debe estar entre 1 y 100. Intenta de nuevo.", "error");
        return null;
    }
    return userNum;
}

function comenzarJuego() {
    if (!selectedValue) {
        alertSweet("Por favor, selecciona una cantidad de intentos antes de comenzar.", "error");
        return;
    }

    alertSweet("El juego ha comenzado. ¡Intenta adivinar el número secreto!", "success", "¡Comienza el juego!");
    // Inicializar el juego
    attempts = parseInt(selectedValue);
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guessedNumbers = [];
    currentAttempt = 0;
    // Bloquear los botones de opción para que no se puedan cambiar
    optionButtons.forEach(btn => {
        btn.disabled = true;
    });

    numberContainer.classList.remove('hidden'); // Quitar la clase 'hidden' para mostrar el contenedor del input
    // Cambiar el texto del botón a "Adivinar"
    adivinarBtn.textContent = "Adivinar";
    adivinarBtn.removeEventListener("click", comenzarJuego);
    adivinarBtn.addEventListener("click", verificarNumero);

    
}
function verificarNumero() {
    if (currentAttempt >= attempts) {
        alertSweet("Has agotado todos tus intentos. El número secreto era: " + secretNumber, "error");
        reiniciarJuego();
        return;
    }

    let userNum = solicitarNumero();
    if (userNum === null) {
        return; // Si el número no es válido, no cuenta como intento
    }

    guessedNumbers.push(userNum); // Agregar el número ingresado a la lista
    currentAttempt++; // Incrementar el contador de intentos

    if (userNum === secretNumber) {
        alertSweet("Números introducidos: " + guessedNumbers.join(", ") + "\nIntentos: " + currentAttempt, "success", "¡Felicidades! Adivinaste el número secreto " + secretNumber);
        reiniciarJuego();
    } else {
        if (currentAttempt < attempts) {
            alertSweet("Ups, el número secreto es incorrecto. Te quedan " + (attempts - currentAttempt) + " intentos.", "error");
        } else {
            alertSweet("Has agotado todos tus intentos. El número secreto era: " + secretNumber, "error");
            console.log("Números introducidos: " + guessedNumbers.join(", ")); // Mostrar números ingresados
            reiniciarJuego();
        }
    }
}

function alertSweet(text, type, title) {
    if(type == "error"){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: text,
        })
    } else if(type == "success"){
        Swal.fire({
            title: title||"Resultado",
            html: text.replace(/\n/g, '<br>'), //Reemplazar \n por <br> para saltos de línea
        })
    }
}

function reiniciarJuego() {
    // Reiniciar el juego
    adivinarBtn.textContent = "Comenzar Juego";
    adivinarBtn.removeEventListener("click", verificarNumero);
    adivinarBtn.addEventListener("click", comenzarJuego);
    numberInput.value = ""; // Limpiar el input
    selectedValue = null; // Reiniciar la selección de intentos
    attempts = 0; // Reiniciar intentos
    secretNumber = null; // Reiniciar número secreto
    guessedNumbers = []; // Reiniciar números ingresados
    currentAttempt = 0; // Reiniciar intentos actuales

    numberContainer.classList.add('hidden'); // Ocultar el contenedor del input
    // Habilitar los botones de opción nuevamente
    optionButtons.forEach(btn => {
        btn.disabled = false;
    });
}
// Inicializar el juego al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    adivinarBtn.addEventListener("click", comenzarJuego);
});