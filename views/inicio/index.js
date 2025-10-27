// La variable API_URL es necesaria aquí para el cliente
const API_URL = 'https://picsum.photos/v2/list?limit=26'; 

async function obtenerImagenDeApi() {
    // AHORA sí podemos usar document.getElementById, porque se ejecuta en el navegador.
    const galeriaContenedor = document.getElementById("galeria-contenedor");

    // Asegúrate de que el contenedor exista antes de continuar.
    if (!galeriaContenedor) {
        console.error("No se encontró el contenedor con ID 'galeria-contenedor'");
        return; 
    }

    try {
        const respuesta = await fetch(API_URL);
        
        // Verifica si la respuesta fue exitosa
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        datos.forEach(imagen => {
            const imagenUrl = `https://picsum.photos/id/${imagen.id}/300/300`;
            const descripcion = `Autor: ${imagen.author}`;

            const cuadro = document.createElement("div");
            cuadro.classList.add("cuadro");

            const imgElement = document.createElement("img");
            imgElement.src = imagenUrl;
            imgElement.alt = descripcion;
            
            const pElement = document.createElement("p");
            pElement.textContent = descripcion;

            cuadro.appendChild(imgElement);
            cuadro.appendChild(pElement);
            galeriaContenedor.appendChild(cuadro);
        });

    } catch (error) {
        console.error("Error al obtener las imágenes de la API:", error);
        galeriaContenedor.innerHTML = '<p>Error al cargar las imágenes. Intente más tarde.</p>'; 
    }
}

// Llama a la función SOLO cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', obtenerImagenDeApi);