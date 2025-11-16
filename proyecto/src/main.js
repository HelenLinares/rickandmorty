
import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';
import mostrarHome from './componentes/home.js';
import mostrarLogin from './componentes/login.js';
import mostrarRegistro from './componentes/registro.js';
import mostrarOriginal from './componentes/original.js';
import mostrarLogout from './componentes/logout.js';


window.mostrarHome = mostrarHome;
window.mostrarLogin = mostrarLogin;
window.mostrarRegistro = mostrarRegistro;
window.mostrarOriginal = mostrarOriginal;
window.mostrarLogout = mostrarLogout;

function initApp() {
  onAuthStateChanged(auth, (user) => {
    const menu = document.getElementById("menu");
    const app = document.getElementById("app");

    if (!menu || !app) {
      console.error('No se encontraron los elementos menu o app');
      return;
    }

    if (user) {
      // Usuario logueado
      menu.innerHTML = `
        <nav>
          <button id="menuHome">Home</button>
          <button id="menuOriginal">🎮 Morty Trivia</button>
          <button id="menuLogout">Logout</button>
        </nav>
      `;

      // Limpiar event listeners anteriores
      menu.replaceWith(menu.cloneNode(true));
      const newMenu = document.getElementById("menu");

      newMenu.querySelector("#menuHome").addEventListener("click", () => window.mostrarHome());
      newMenu.querySelector("#menuOriginal").addEventListener("click", () => window.mostrarOriginal());
      newMenu.querySelector("#menuLogout").addEventListener("click", () => window.mostrarLogout());

      window.mostrarHome();
    } else {
      // Usuario no logueado
      menu.innerHTML = `
        <nav>
          <button id="menuLogin">Login</button>
          <button id="menuRegistro">Registro</button>
        </nav>
      `;

      // Limpiar event listeners anteriores
      menu.replaceWith(menu.cloneNode(true));
      const newMenu = document.getElementById("menu");

      newMenu.querySelector("#menuLogin").addEventListener("click", () => window.mostrarLogin());
      newMenu.querySelector("#menuRegistro").addEventListener("click", () => window.mostrarRegistro());

      window.mostrarLogin();
    }
  });
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}