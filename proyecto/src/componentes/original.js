import { db, auth } from '../firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

export default async function mostrarOriginal() {

  const contenedor = document.getElementById("app");
  contenedor.innerHTML = "<h2>Morty Trivia Challenge</h2><p>Cargando personaje...</p>";

  // 1Traer personaje aleatorio 
  try {
    const randomId = Math.floor(Math.random() * 826) + 1;

    const res = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`);
    if (!res.ok) throw new Error("Error al traer personaje");

    const personaje = await res.json();

    iniciarFormulario(personaje);

  } catch (error) {
    contenedor.innerHTML = "<p>Error cargando personaje.</p>";
    console.error(error);
  }

  
  //  Construcción del formulario 
 
  function iniciarFormulario(personaje) {

    contenedor.innerHTML = "<h2>Morty Trivia Challenge</h2>";

    // OBJETO BASE 
    let trivia = {
      personaje: personaje.name,
      imagen: personaje.image,
      especie: personaje.species,
      pregunta: "¿Cuál es el estado REAL del personaje?",
      respuestaUsuario: "",
      estadoReal: personaje.status, // Alive / Dead / unknown
      acierto: false,
      puntos: 0,
      fecha: new Date().toISOString(),
    };

    // CONTENEDORES
    const form = document.createElement("div");
    const resultado = document.createElement("pre");

    resultado.textContent = JSON.stringify(trivia, null, 2);

    // Mostrar imagen
    const img = document.createElement("img");
    img.src = personaje.image;
    img.style.width = "150px";
    img.style.borderRadius = "10px";
    form.appendChild(img);

    // CAMPOS EDITABLES 
    const campos = [
      { key: "personaje", label: "Nombre del personaje" },
      { key: "especie", label: "Especie del personaje" },
      { key: "pregunta", label: "Pregunta" }
    ];

    campos.forEach(({ key, label }) => {
      const p = document.createElement("p");
      p.textContent = label;

      const input = document.createElement("input");
      input.value = trivia[key];
      input.placeholder = label;

      input.oninput = () => {
        trivia[key] = input.value;
        resultado.textContent = JSON.stringify(trivia, null, 2);
      };

      form.appendChild(p);
      form.appendChild(input);
    });

    
    //  BOTONES DE RESPUESTA (Alive, Dead, unknown)
    
    const opciones = ["Alive", "Dead", "unknown"];
    const botones = document.createElement("div");
    botones.style.display = "flex";
    botones.style.gap = "10px";
    botones.style.margin = "15px 0";

    opciones.forEach(op => {
      const b = document.createElement("button");
      b.textContent = op;
      b.onclick = () => {
        trivia.respuestaUsuario = op;
        trivia.acierto = trivia.estadoReal === op;
        trivia.puntos = trivia.acierto ? 10 : 0;

        resultado.textContent = JSON.stringify(trivia, null, 2);
      };
      botones.appendChild(b);
    });

    form.appendChild(botones);

    
    // GUARDAR EN FIREBASE
   
    const btnGuardar = document.createElement("button");
    btnGuardar.textContent = "Guardar resultado en Firebase";

    btnGuardar.onclick = async () => {
      const user = auth.currentUser;

      if (!user) {
        alert("Debes iniciar sesión para guardar tu trivia.");
        return;
      }

      const datos = {
        ...trivia,
        uid: user.uid
      };

      try {
        await addDoc(collection(db, "trivia_rickmorty"), datos);
        alert("✅ Resultado guardado correctamente en Firebase!");
      } catch (error) {
        alert("❌ Error al guardar en Firebase.");
        console.error(error);
      }
    };

    form.appendChild(btnGuardar);

    
    contenedor.appendChild(form);
    contenedor.appendChild(resultado);
  }
}
