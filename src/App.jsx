import { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Promotions from './components/Promotions';
import About from './components/About';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Login from './components/Login';
import Registro from './components/Registro';
import AccessLogs from './components/AccessLogs';

function App() {
  const [vista, setVista] = useState('publica');
  const [volverA, setVolverA] = useState('login');
  const [usuarioActual, setUsuarioActual] = useState(null);

  const [productos, setProductos] = useState(() => {
    try {
      const guardados = localStorage.getItem('productos');
      if (guardados) return JSON.parse(guardados);
    } catch (error) {
      console.error('No se pudieron cargar los productos:', error);
    }
    return [
      { id: 1, nombre: 'Pastel de fresa', categoria: 'Pasteles', precio: 35, descripcion: 'Delicioso pastel con crema y fresas.', imagen: 'https://placehold.co/400x300?text=Pastel+de+Fresa', activo: true },
      { id: 2, nombre: 'Cheesecake', categoria: 'Postres', precio: 25, descripcion: 'Cheesecake suave y cremoso.', imagen: 'https://placehold.co/400x300?text=Cheesecake', activo: true }
    ];
  });

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  function guardarActividad(actividad, usuario = usuarioActual?.usuario || 'Desconocido') {
    const registros = JSON.parse(localStorage.getItem('registrosAlmara') || '[]');
    registros.push({
      usuario,
      actividad,
      fecha: new Date().toLocaleString(),
      navegador: navigator.userAgent,
      ip: 'No disponible en frontend'
    });
    localStorage.setItem('registrosAlmara', JSON.stringify(registros));
  }

  function ingresar(usuario) {
    setUsuarioActual(usuario);
    guardarActividad('Inicio de sesión', usuario.usuario);
    setVista('admin');
  }

  function cerrarSesion() {
    guardarActividad('Cierre de sesión');
    setUsuarioActual(null);
    setVista('publica');
  }

  return (
    <div className="pagina">
      {vista === 'publica' && (
        <>
          <Navbar alIniciarSesion={() => setVista('login')} />
          <Hero />
          <div className="separador"><span>✿</span> Un mundo de pequeños antojos <span>✿</span></div>
          <Menu productos={productos} />
          <Promotions />
          <About />
          <Footer />
        </>
      )}

      {vista === 'login' && (
        <Login
          alIngresar={ingresar}
          alVolver={() => setVista('publica')}
          alRegistrarse={() => { setVolverA('login'); setVista('registro'); }}
        />
      )}

      {vista === 'registro' && <Registro alVolver={() => setVista(volverA)} />}

      {vista === 'admin' && usuarioActual && (
        <section className="admin-panel">
          <div className="admin-header">
            <div>
              <h1>Panel de Almara ✿</h1>
              <p>Sesión: <strong>{usuarioActual.nombre}</strong> · Rol: <strong>{usuarioActual.rol}</strong></p>
            </div>
            <div className="admin-header-acciones">
              {usuarioActual.rol === 'Administrador' && (
                <button onClick={() => setVista('logs')}>Ver actividad</button>
              )}
              <button onClick={cerrarSesion}>Cerrar sesión</button>
            </div>
          </div>
          <Admin productos={productos} setProductos={setProductos} usuarioActual={usuarioActual} />
        </section>
      )}

      {vista === 'logs' && usuarioActual?.rol === 'Administrador' && (
        <AccessLogs alVolver={() => setVista('admin')} />
      )}
    </div>
  );
}

export default App;
