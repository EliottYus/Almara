import { useState } from 'react';

function AccessLogs({ alVolver }) {
  const [registros, setRegistros] = useState(() => JSON.parse(localStorage.getItem('registrosAlmara') || '[]'));

  function borrarRegistros() {
    if (window.confirm('¿Deseas borrar todos los registros?')) {
      localStorage.removeItem('registrosAlmara');
      setRegistros([]);
    }
  }

  return (
    <section className="admin-panel">
      <div className="admin-header">
        <h1>Registro de actividad ✿</h1>
        <button onClick={alVolver}>Volver al panel</button>
      </div>
      <div className="admin-contenido logs-contenido">
        <h2>Historial de accesos</h2>
        <p>Actividades realizadas en el sistema de Almara.</p>
        {registros.length === 0 ? <p>Todavía no hay registros.</p> : (
          <div className="tabla-contenedor"><table>
            <thead><tr><th>Usuario</th><th>Actividad</th><th>Fecha y hora</th><th>Navegador</th><th>Dirección IP</th></tr></thead>
            <tbody>{registros.slice().reverse().map((registro, index) => (
              <tr key={`${registro.fecha}-${index}`}><td>{registro.usuario}</td><td>{registro.actividad}</td><td>{registro.fecha}</td><td className="celda-navegador">{registro.navegador}</td><td>{registro.ip}</td></tr>
            ))}</tbody>
          </table></div>
        )}
        <button onClick={borrarRegistros}>Borrar registros</button>
      </div>
    </section>
  );
}

export default AccessLogs;
