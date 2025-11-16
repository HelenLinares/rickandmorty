import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig.js'; 
import mostrarLogin from './login.js';

export default function mostrarRegistro() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Registro</h2>
    <input type="text" id="nombre" placeholder="Nombre"><br>
    <input type="email" id="correo" placeholder="Correo electrónico"><br>
    <input type="password" id="contrasena" placeholder="Contraseña"><br>
    <input type="text" id="fecha" placeholder="Fecha de nacimiento"><br>
    <input type="tel" id="telefono" placeholder="Teléfono"><br>
    <button id="btnRegistro">Registrarse</button>
  `;

  document.getElementById("btnRegistro").onclick = async () => {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const fecha = document.getElementById("fecha").value;
    const telefono = document.getElementById("telefono").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);

      await setDoc(doc(db, "usuarios", userCredential.user.uid), {
        uid: userCredential.user.uid,
        nombre,
        correo,
        fecha,
        telefono,
        ganados: 0,
        perdidos: 0
      });

      alert("Usuario registrado.");
      mostrarLogin();
    } catch (error) {
      alert("Error al registrarse: " + error.message);
    }
  };
}
