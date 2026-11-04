import { useEffect, useState } from 'react';

function Login({ alIngresar, alVolver, alRegistrarse }) {
  const [modo, setModo] = useState('login');
  const [correo, setCorreo] = useState('');
  const [intentos, setIntentos] = useState(0);
  const [bloqueadoHasta, setBloqueadoHasta] = useState(null);
  const [segundosRestantes, setSegundosRestantes] = useState(0);

  useEffect(() => {
    if (!bloqueadoHasta) return undefined;
    const actualizar = () => {
      const restante = Math.ceil((bloqueadoHasta - Date.now()) / 1000);
      if (restante <= 0) {
        setBloqueadoHasta(null);
        setSegundosRestantes(0);
      } else setSegundosRestantes(restante);
    };
    actualizar();
    const intervalo = setInterval(actualizar, 1000);
    return () => clearInterval(intervalo);
  }, [bloqueadoHasta]);

  function iniciarSesion(e) {
    e.preventDefault();
    if (bloqueadoHasta && Date.now() < bloqueadoHasta) return;

    const usuarioIngresado = e.target.usuario.value.trim();
    const contrasenaIngresada = e.target.contrasena.value;
    const usuarios = JSON.parse(localStorage.getItem('usuariosAlmara') || '[]');

    // Cuenta de demostración del administrador, conservada para facilitar las pruebas.
    const administradorDemo = usuarioIngresado === 'admin' && contrasenaIngresada === 'almara123'
      ? { nombre: 'Administrador de Almara', usuario: 'admin', correo: 'admin@almara.com', rol: 'Administrador' }
      : null;

    const cuenta = usuarios.find(u => u.usuario.toLowerCase() === usuarioIngresado.toLowerCase() && u.contrasena === contrasenaIngresada);
    const usuarioValido = administradorDemo || cuenta;

    if (usuarioValido) {
      setIntentos(0);
      alIngresar({ nombre: usuarioValido.nombre, usuario: usuarioValido.usuario, rol: usuarioValido.rol });
    } else {
      const nuevosIntentos = intentos + 1;
      if (nuevosIntentos >= 3) {
        setIntentos(0);
        setBloqueadoHasta(Date.now() + 30000);
        alert('Has alcanzado 3 intentos fallidos. Acceso bloqueado por 30 segundos.');
      } else {
        setIntentos(nuevosIntentos);
        alert(`Usuario o contraseña incorrectos. Intento ${nuevosIntentos} de 3.`);
      }
    }
  }

  function recuperarContrasena(e) {
    e.preventDefault();
    alert('La recuperación por correo se habilitará cuando se conecte el backend. Esta pantalla es una demostración.');
    setCorreo('');
    setModo('login');
  }

  return (
    <section className="login-section">
      <div className="login-card">
        {modo === 'login' ? <>
          <h2>Bienvenido a Almara ✿</h2>
          <p>Ingresa para administrar tu pastelería</p>
          <form onSubmit={iniciarSesion}>
            <input type="text" name="usuario" placeholder="Usuario" autoComplete="username" required />
            <input type="password" name="contrasena" placeholder="Contraseña" autoComplete="current-password" required />
            {bloqueadoHasta && <p className="seguridad debil">Acceso bloqueado. Intenta nuevamente en <strong>{segundosRestantes} segundos.</strong></p>}
            <button type="submit" disabled={Boolean(bloqueadoHasta)}>{bloqueadoHasta ? 'Acceso bloqueado' : 'Iniciar sesión'}</button>
          </form>
          <p className="texto-ayuda-login">Prueba administrador: <strong>admin</strong> / <strong>almara123</strong></p>
          <button type="button" className="volver-btn" onClick={() => setModo('recuperar')}>¿Olvidaste tu contraseña?</button>
          <button type="button" className="volver-btn" onClick={alRegistrarse}>Crear una cuenta de empleado</button>
          <button type="button" className="volver-btn" onClick={alVolver}>Volver a Almara</button>
        </> : <>
          <h2>Recuperar contraseña ♡</h2>
          <p>Ingresa tu correo electrónico para continuar.</p>
          <form onSubmit={recuperarContrasena}>
            <input type="email" placeholder="Correo electrónico" value={correo} onChange={e => setCorreo(e.target.value)} required />
            <button type="submit">Continuar</button>
          </form>
          <button type="button" className="volver-btn" onClick={() => setModo('login')}>Volver al inicio de sesión</button>
        </>}
      </div>
    </section>
  );
}

export default Login;
