// Declara una variable global para almacenar los datos de las personas.
let arregloPersonas = [];

// Define una función de expresión de invocación inmediata (IIFE).
let funcionIife = (function () {

  // Retorna un objeto con dos métodos: obtenerDatos y mostrarDatos.
  return {
    // Define un método asincrónico obtenerDatos para obtener datos de usuarios aleatorios.
    obtenerDatos:
      async () => {
        try {
          // Realiza una solicitud HTTP GET a la API "Random User Generator".
          const respuesta = await fetch("https://randomuser.me/api/?results=10");
          // Verifica si la respuesta es exitosa (código de estado HTTP 200-299).
          if (!respuesta.ok) {
            // Si la respuesta no es exitosa, lanza un error.
            throw 'Solicitud sin éxito';
          }
          // Convierte la respuesta en formato JSON.
          const datos = await respuesta.json();
          // Almacena los resultados en la variable global arregloPersonas.
          arregloPersonas = datos.results;
          // Retorna los datos obtenidos.
          return datos.results;
        }
        // Maneja cualquier error ocurrido durante la obtención de datos.
        catch (error) {
          console.error("Respuesta", error);
        }
      },
    // Define un método mostrarDatos para renderizar los datos en la página web.
    mostrarDatos:
      (datos) => {
        // Obtiene el elemento del DOM con el id 'user-data'.
        const userData = document.getElementById('user-data');
        // Limpia el contenido del elemento 'userData'.
        userData.innerHTML = '';
        // Itera sobre cada dato de usuario y lo renderiza dentro de un elemento 'card'.
        datos.forEach((dato) => {
          userData.innerHTML += `
                        <div class="card">
                          <img src="${dato.picture.large}" alt="">
                          <p>${dato.name.title} ${dato.name.first} ${dato.name.last}</p>
                          <p>${dato.email}</p>
                          <p>${dato.phone}</p>
                        </div>
                    `;
        });
      }
  };
})();

// Define una función asincrónica para obtener y mostrar los datos.
async function obtenerYMostrarDatos() {
  // Obtiene los datos de usuarios.
  const datosRecibidos = await funcionIife.obtenerDatos();
  // Muestra los datos obtenidos en la página web.
  funcionIife.mostrarDatos(datosRecibidos);
}

// Llama a la función obtenerYMostrarDatos para iniciar el proceso de obtención y visualización de datos.
obtenerYMostrarDatos();
