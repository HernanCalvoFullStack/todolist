// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Event Listeners
eventListeners()

function eventListeners() {
  // Cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet)

  // Cuando el documento esté listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse( localStorage.getItem("tweets")) || [];
    
    crearHTML();
  })

}

// Funciones
function agregarTweet(e) {
  e.preventDefault()

  // Textarea donde el usuario escribe
  const tweet = document.querySelector("#tweet").value;
  
  // Validación
  if(tweet === "") {
    mostrarError("El mensaje no puede ir vacío")

    return; // Evita que se ejecuten más líneas de código
  }

  const tweetObj = {
    id: Date.now(),
    tweet
  }

  // Añadir el tweet al arreglo
  tweets = [...tweets, tweetObj];

  // Limpiar HTML
  limpiarHTML()

  // Una vez agregado al arreglo, vamos a crear el HTML
  crearHTML();

  // Reiniciar el Formulario
  formulario.reset();
}

// Mostrar mensaje de error
function mostrarError (error) {
  const mensajeError = document.createElement("P");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  // Insertar el error en el Contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  // Eliminar la alerta después de dos segundos
  setTimeout(() => {
    mensajeError.remove()
  }, 2000);
}

// Mostrar un listado de los tweets
function crearHTML () {

  limpiarHTML()

  if(tweets.length > 0) {
    tweets.forEach( tweet => {
      // Agregar un botón de eliminar
      const botonEliminar = document.createElement("A");
      botonEliminar.classList.add("borrar-tweet");
      botonEliminar.textContent = "X";

      // Añadir la función de eliminar
      botonEliminar.onclick = () => {
        borrarTweet(tweet.id);
      }

      // Crear el HTML
      const li = document.createElement("LI");

      // Añadir el texto
      li.textContent = tweet.tweet;
      
      // Asignar el botón
      li.appendChild(botonEliminar)

      // Agregar en el HTML
      listaTweets.appendChild(li)
    })
  }

  sincronizarStorage();
}

// Agregar los tweets al Local Storage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets))
}

// Eliminar un tweet
function borrarTweet (id) {
  tweets = tweets.filter( tweet => tweet.id !== id);
 
  crearHTML();
}

//  Limpiar el HTML previo
function limpiarHTML () {
  while( listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild)
  }
}