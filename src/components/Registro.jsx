import { useState } from 'react';

function Registro({ alVolver }) {
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [captcha, setCaptcha] = useState(false);

  function evaluarContrasena(valor) {
    if (!valor) return '';
    let puntos = 0;
    if (valor.length >= 8) puntos++;
    if (/[A-Z]/.test(valor)) puntos++;
    if (/[a-z]/.test(valor)) puntos++;
    if (/[0-9]/.test(valor)) puntos++;
    if (/[^A-Za-z0-9]/.test(valor)) puntos++;
    if (puntos <= 2) return 'Débil';
    if (puntos <= 4) return 'Intermedia';
    return 'Fuerte';
  }

  const seguridad = evaluarContrasena(contrasena);

  function registrar(e) {
    e.preventDefault();
    if (contrasena !== confirmar) return alert('Las contraseñas no coinciden');
    if (!captcha) return alert('Debes completar el CAPTCHA');
    if (contrasena.length < 8) return alert('La contraseña debe tener al menos 8 caracteres');

    const usuarios = JSON.parse(localStorage.getItem('usuariosAlmara') || '[]');
    const existe = usuarios.some(u => u.usuario.toLowerCase() === usuario.trim().toLowerCase() || u.correo.toLowerCase() === correo.trim().toLowerCase());
    if (existe || usuario.trim().toLowerCase() === 'admin') return alert('Ese usuario o correo ya está registrado.');

    // El registro público crea cuentas de empleado. El rol administrador no se asigna desde este formulario.
    usuarios.push({
      id: Date.now(),
      nombre: nombre.trim(),
      usuario: usuario.trim(),
      correo: correo.trim(),
      contrasena,
      rol: 'Empleado'
    });
    localStorage.setItem('usuariosAlmara', JSON.stringify(usuarios));
    alert('Cuenta de empleado creada correctamente. Ya puedes iniciar sesión.');
    setNombre(''); setUsuario(''); setCorreo(''); setContrasena(''); setConfirmar(''); setCaptcha(false);
    alVolver();
  }

  return (
    <section className="login-section">
      <div className="login-card">
        <h2>Crear cuenta en Almara ♡</h2>
        <p>Regístrate para acceder como empleado.</p>
        <form onSubmit={registrar}>
          <input type="text" placeholder="Nombre completo" value={nombre} onChange={e => setNombre(e.target.value)} required />
          <input type="text" placeholder="Nombre de usuario" value={usuario} onChange={e => setUsuario(e.target.value)} required />
          <input type="email" placeholder="Correo electrónico" value={correo} onChange={e => setCorreo(e.target.value)} required />
          <input type="password" placeholder="Contraseña (mínimo 8 caracteres)" value={contrasena} onChange={e => setContrasena(e.target.value)} required minLength={8} />
          {seguridad && <p className={`seguridad ${seguridad === 'Débil' ? 'debil' : seguridad === 'Intermedia' ? 'intermedia' : 'fuerte'}`}>Seguridad de contraseña: <strong>{seguridad}</strong></p>}
          <input type="password" placeholder="Confirmar contraseña" value={confirmar} onChange={e => setConfirmar(e.target.value)} required />
          <div className="captcha-box"><label><input type="checkbox" checked={captcha} onChange={e => setCaptcha(e.target.checked)} /> No soy un robot (demostración)</label></div>
          <button type="submit">Registrarme</button>
        </form>
        <button type="button" className="volver-btn" onClick={alVolver}>Volver al inicio de sesión</button>
      </div>
    </section>
  );
}

export default Registro;
