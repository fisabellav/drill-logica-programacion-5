// Crear un programa en Javascript que realice lo siguiente:
// Debe pedirle al usuario que intente adivinar el número secreto por prompt o por input, dicho número será del 1 al 100.
// Si el usuario no adivina el número secreto, debe mostrar un mensaje por consola o DOM diciendo: “Ups, el número secreto es incorrecto, vuelve a intentarlo. ” y volver a solicitarle que ingrese un número.
// Si el usuario adivina el número secreto debe de mostrar un mensaje por consola o DOM diciendo: “Felicidades, adivinaste el número secreto”. Además debe imprimir por consola o DOM la lista de números introducidos antes de adivinar el número secreto.
// El número secreto puede ser definido manualmente o generar un número aleatorio, pero recuerda que debe ser del 1 al 100.
// Debe ser capaz de identificar si el dato de entrada es de tipo number, en caso contrario debe mandar un mensaje de error y volver a solicitar el dato.

const prompt = require("prompt-sync")(); // Importa la librería prompt-sync para usar prompt en Node.js


function solicitarNumero(mensaje) {
    let userNum = prompt(mensaje);
    if (isNaN(userNum)) {
        console.log("Por favor, ingresa un número válido.");
        return null;
    }
    userNum = parseInt(userNum);
    if (userNum < 1 || userNum > 100) {
        console.log("El número debe estar entre 1 y 100. Intenta de nuevo.");
        return null;
    }
    return userNum;
}

function mostrarResultado(secretNumber, guessedNumbers, success) {
    if (success) {
        console.log("Felicidades, adivinaste el número secreto: " + secretNumber);
        console.log("Números introducidos antes de adivinar: " + guessedNumbers.join(", "));
    } else {
        console.log("Has agotado tus intentos. El número secreto era: " + secretNumber);
        console.log("Números introducidos en los intentos: " + guessedNumbers.join(", "));
    }
}

function adivinaNumero() {
    let attempts = prompt("Ingresa cantidad de intentos: ");
    let secretNumber = Math.floor(Math.random() * 100) + 1;
    let guessedNumbers = [];
    let success = false;

    for (let i = 0; i < attempts; i++) {
        let userNum = solicitarNumero("Adivina el número secreto entre 1 y 100: ");
        if (userNum === null) {
            i--; // Decrementa el contador de intentos si la entrada no es válida
            continue; // Pide el número nuevamente
        }
        if (userNum === secretNumber) {
            success = true;
            break;
        } else {
            console.log("Ups, el número secreto es incorrecto, vuelve a intentarlo.");
            guessedNumbers.push(userNum);
        }
    }

    mostrarResultado(secretNumber, guessedNumbers, success);
}

adivinaNumero(); // Llama a la función para iniciar el juego