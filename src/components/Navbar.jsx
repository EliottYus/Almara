function Navbar({ alIniciarSesion }) {
  return (
    <header className="navbar">

      <a href="#inicio" className="logo">
        Almara<span>♡</span>
      </a>

      <nav className="nav-links">
        <a href="#inicio">Inicio</a>
        <a href="#menu">Nuestro menú</a>
        <a href="#promociones">Promociones</a>
        <a href="#nosotros">Nosotros</a>
      </nav>

      <div className="nav-botones">
        <button
          className="login-nav"
          onClick={alIniciarSesion}
        >
          Iniciar sesión
        </button>

        <a href="#menu" className="boton-nav">
          Ver menú ✿
        </a>
      </div>

    </header>
  );
}

export default Navbar;
