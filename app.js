let nombres =[];

function agregarAmigo() {
    let inputNombreAmigo = document.getElementById('amigo');
    let nombreAmigo = inputNombreAmigo.value;
    if (nombreAmigo.trim() === "") { // Usamos .trim() para eliminar espacios en blanco al inicio y final y verificar si queda vacío
        alert("Por favor, inserte un nombre.");
        return;
    }
    // Actualizar el array de amigos:
    nombres.push(nombreAmigo);
    inputNombreAmigo.value = ""; // Establecemos el valor del campo de texto a una cadena vacía ""
    actualizarListaAmigosVisual(); // Llamamos a la función para actualizar la lista visual en el HTML
}

function actualizarListaAmigosVisual() {
    let listaAmigosUL = document.getElementById('listaAmigos');
    listaAmigosUL.innerHTML = ""; // Limpiamos el contenido HTML dentro de la lista <ul>.
    // Iterar sobre el arreglo
    for (let nombre of nombres) {
        // Agregar elementos a la lista.
        let nuevoLi = document.createElement('li');
        nuevoLi.textContent = nombre;
        listaAmigosUL.appendChild(nuevoLi);
    }
}

function sortearAmigoSecreto(nombresParticipantes) {
    let nombresCopia = [...nombresParticipantes]; // Creamos una copia del array para no modificar el original directamente
    let asignaciones = {}; // Objeto para almacenar las asignaciones de amigo secreto (nombre: amigo secreto asignado)
    for (let nombre of nombresParticipantes) {
        let amigoSecreto = "";
        let indiceAleatorio;        
        do {
            indiceAleatorio = Math.floor(Math.random() * nombresCopia.length); // Generamos un índice aleatorio.
            amigoSecreto = nombresCopia[indiceAleatorio]; // Obtenemos el nombre del amigo secreto usando el índice aleatorio.
        } while (amigoSecreto === nombre); // Nos aseguramos de que una persona no se asigne a sí misma como amigo secreto.
        asignaciones[nombre] = amigoSecreto; // Asignamos el amigo secreto.
        nombresCopia.splice(indiceAleatorio, 1); // Eliminamos el amigo secreto ya asignado del array nombresCopia para que no se pueda volver a asignar a otra persona.
    }
    return asignaciones;
}

function mostrarResultados(asignaciones) {
    let resultadosUL = document.getElementById('resultado'); // Obtenemos el elemento <ul>.
    resultadosUL.innerHTML = ""; 
    for (let nombre in asignaciones) { // Iteramos sobre las propiedades.
        let amigoSecreto = asignaciones[nombre]; // Obtenemos el amigo secreto asignado a este 'nombre' desde el objeto 'asignaciones'
        let itemLista = document.createElement('li'); // Creamos un nuevo elemento <li> para cada resultado
        itemLista.textContent = `${nombre} le regalará a: ${amigoSecreto}`; // Establecemos el texto del <li> para mostrar el par "nombre le regalará a: amigoSecreto"
        resultadosUL.appendChild(itemLista); // Añadimos el <li> a la lista de resultados en la página web
    }
}

function sortearAmigo() {
    if (nombres.length < 2) { // Comprobamos si hay al menos 2 nombres en el array 'nombres'.
        alert("Por favor, ingrese al menos dos nombres para realizar el sorteo.");
        return;
    }
    let asignaciones = sortearAmigoSecreto(nombres); // Llamamos a la función sortearAmigoSecreto() pasándole el array 'nombres' para que realice el sorteo. Guardamos el resultado (objeto de asignaciones) en la variable 'asignaciones'.
    mostrarResultados(asignaciones);
}


