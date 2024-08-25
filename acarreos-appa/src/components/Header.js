import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header>
      <div className="logo">Appa</div>
      <nav>
        <button>Cotizar</button>
        <button>Localizar</button>
        <button>Iniciar sesión</button>
        <button>Registrarse</button>
      </nav>
    </header>
  );
}

export default Header;