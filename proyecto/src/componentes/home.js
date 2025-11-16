
export default function mostrarHome() {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = "<h2>Cargando personajes de Rick and Morty...</h2>";

  
  fetch("https://rickandmortyapi.com/api/character")
    .then(response => response.json())
    .then(data => {
      const personajes = data.results;
      appContainer.innerHTML = "";

      personajes.forEach((personaje) => {
        const card = document.createElement("div");
        card.classList.add("app-card");

        card.innerHTML = `
          <img src="${personaje.image}" alt="${personaje.name}">
          <div class="app-info">
            <h2>${personaje.name}</h2>
            <p><strong>Estado:</strong> ${personaje.status}</p>
            <p><strong>Especie:</strong> ${personaje.species}</p>
            <p><strong>Género:</strong> ${personaje.gender}</p>
            <p><strong>Origen:</strong> ${personaje.origin.name}</p>
            <p><strong>Ubicación:</strong> ${personaje.location.name}</p>
          </div>
        `;

        appContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error:", error);
      appContainer.innerHTML = "<p>Error al cargar los personajes de Rick and Morty 😢</p>";
    });
}