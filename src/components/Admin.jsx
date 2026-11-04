import { useEffect, useState } from 'react';

const CATEGORIAS = ['Pasteles', 'Postres', 'Bebidas', 'Especiales'];

function Admin({ productos, setProductos, usuarioActual }) {
  const esAdmin = usuarioActual?.rol === 'Administrador';
  const [seccion, setSeccion] = useState('inicio');
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Pasteles');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [editando, setEditando] = useState(null);
  const [clientes, setClientes] = useState(() => JSON.parse(localStorage.getItem('clientes') || '[]'));
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');

  useEffect(() => localStorage.setItem('clientes', JSON.stringify(clientes)), [clientes]);

  function limpiarFormulario() {
    setEditando(null); setNombre(''); setCategoria('Pasteles'); setPrecio(''); setDescripcion(''); setImagen('');
  }

  function guardarProducto(e) {
    e.preventDefault();
    if (Number(precio) <= 0) return alert('El precio debe ser mayor a cero.');
    if (editando !== null) {
      setProductos(productos.map(p => p.id === editando ? { ...p, nombre: nombre.trim(), categoria, precio: Number(precio), descripcion: descripcion.trim(), imagen: imagen.trim() || p.imagen } : p));
      alert('Producto actualizado correctamente.');
    } else {
      setProductos([...productos, { id: Date.now(), nombre: nombre.trim(), categoria, precio: Number(precio), descripcion: descripcion.trim(), imagen: imagen.trim() || 'https://placehold.co/400x300?text=Producto', activo: true }]);
      alert('Producto agregado correctamente.');
    }
    limpiarFormulario();
  }

  function prepararEdicion(producto) {
    setEditando(producto.id); setNombre(producto.nombre); setCategoria(producto.categoria); setPrecio(producto.precio); setDescripcion(producto.descripcion); setImagen(producto.imagen || '');
    setSeccion('productos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cambiarEstado(id, activo) {
    if (!esAdmin) return;
    const accion = activo ? 'reactivar' : 'desactivar';
    if (window.confirm(`¿Deseas ${accion} este producto?`)) {
      setProductos(productos.map(p => p.id === id ? { ...p, activo } : p));
    }
  }

  function guardarCliente(e) {
    e.preventDefault();
    setClientes([...clientes, { id: Date.now(), nombre: nombreCliente.trim(), telefono: telefonoCliente.trim() }]);
    setNombreCliente(''); setTelefonoCliente('');
    alert('Cliente registrado correctamente.');
  }

  function eliminarCliente(id) {
    if (window.confirm('¿Deseas eliminar este cliente?')) setClientes(clientes.filter(c => c.id !== id));
  }

  const activos = productos.filter(p => p.activo);
  const totalPrecio = activos.reduce((suma, p) => suma + Number(p.precio || 0), 0);

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Almara ♡</h2>
        <p>{esAdmin ? 'Administrador' : 'Empleado'}</p>
        <button className={`menu-admin ${seccion === 'inicio' ? 'activo' : ''}`} onClick={() => setSeccion('inicio')}>🏠 Inicio</button>
        <button className={`menu-admin ${seccion === 'productos' ? 'activo' : ''}`} onClick={() => setSeccion('productos')}>🧁 Productos</button>
        <button className={`menu-admin ${seccion === 'clientes' ? 'activo' : ''}`} onClick={() => setSeccion('clientes')}>👥 Clientes</button>
        {esAdmin && <button className={`menu-admin ${seccion === 'reportes' ? 'activo' : ''}`} onClick={() => setSeccion('reportes')}>📊 Reportes</button>}
      </aside>

      <main className="admin-contenido">
        {seccion === 'inicio' && <>
          <h2>Panel de control ✿</h2>
          <p className="admin-descripcion">Bienvenido/a, {usuarioActual?.nombre || 'al equipo de Almara'}.</p>
          <div className="admin-estadisticas">
            <div className="estadistica-card"><span>✿</span><h3>{productos.length}</h3><p>Total de productos</p></div>
            <div className="estadistica-card"><span>♡</span><h3>{activos.length}</h3><p>Productos activos</p></div>
            <div className="estadistica-card"><span>☁</span><h3>{productos.length - activos.length}</h3><p>Productos inactivos</p></div>
            <div className="estadistica-card"><span>👥</span><h3>{clientes.length}</h3><p>Clientes registrados</p></div>
          </div>
          <h3>Tu espacio de trabajo</h3>
          <p>Utiliza el menú para administrar los productos y clientes de Almara.</p>
          {!esAdmin && <p className="aviso-permisos">Tu cuenta de empleado puede agregar y editar productos, pero no desactivarlos ni consultar reportes o registros.</p>}
        </>}

        {seccion === 'productos' && <section className="admin-section">
          <h2>Administración de productos</h2>
          <form onSubmit={guardarProducto} className="admin-form">
            <h3>{editando !== null ? 'Editar producto' : 'Agregar producto'}</h3>
            <input type="text" placeholder="Nombre del producto" value={nombre} onChange={e => setNombre(e.target.value)} required />
            <select value={categoria} onChange={e => setCategoria(e.target.value)}>{CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}</select>
            <input type="number" placeholder="Precio en Bs" min="0.01" step="0.01" value={precio} onChange={e => setPrecio(e.target.value)} required />
            <input type="text" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
            <input type="url" placeholder="URL de la imagen (opcional)" value={imagen} onChange={e => setImagen(e.target.value)} />
            <button type="submit">{editando !== null ? 'Guardar cambios' : 'Agregar producto'}</button>
            {editando !== null && <button type="button" className="boton-secundario" onClick={limpiarFormulario}>Cancelar edición</button>}
          </form>
          <h3>Productos registrados</h3>
          <div className="admin-lista">{productos.map(producto => <div className="admin-producto" key={producto.id}>
            <div><strong>{producto.nombre}</strong><p>{producto.categoria} - Bs. {Number(producto.precio).toFixed(2)}</p><small>Estado: {producto.activo ? 'Activo' : 'Inactivo'}</small></div>
            <div className="admin-acciones">
              <button type="button" onClick={() => prepararEdicion(producto)}>Editar</button>
              {esAdmin && (producto.activo
                ? <button type="button" className="boton-peligro" onClick={() => cambiarEstado(producto.id, false)}>Desactivar</button>
                : <button type="button" onClick={() => cambiarEstado(producto.id, true)}>Reactivar</button>)}
            </div>
          </div>)}</div>
        </section>}

        {seccion === 'clientes' && <section className="admin-section">
          <h2>Administración de clientes ♡</h2>
          <p>Registra y consulta los clientes de Almara.</p>
          <form onSubmit={guardarCliente} className="admin-form">
            <h3>Registrar nuevo cliente</h3>
            <input type="text" placeholder="Nombre completo" value={nombreCliente} onChange={e => setNombreCliente(e.target.value)} required />
            <input type="tel" placeholder="Número de teléfono" value={telefonoCliente} onChange={e => setTelefonoCliente(e.target.value)} required />
            <button type="submit">Registrar cliente</button>
          </form>
          <h3>Clientes registrados</h3>
          <div className="admin-lista">{clientes.length === 0 ? <p>No hay clientes registrados todavía.</p> : clientes.map(cliente => <div className="admin-producto" key={cliente.id}>
            <div><strong>{cliente.nombre}</strong><p>Teléfono: {cliente.telefono}</p></div>
            <div className="admin-acciones"><button type="button" className="boton-peligro" onClick={() => eliminarCliente(cliente.id)}>Eliminar</button></div>
          </div>)}</div>
        </section>}

        {seccion === 'reportes' && esAdmin && <section className="admin-section reporte-imprimible">
          <div className="reporte-titulo"><div><h2>Reportes y estadísticas ✿</h2><p>Resumen general de la información de Almara.</p></div><button className="no-imprimir" onClick={() => window.print()}>Guardar / Imprimir PDF</button></div>
          <p className="fecha-reporte">Reporte generado: {new Date().toLocaleString()}</p>
          <div className="admin-estadisticas">
            <div className="estadistica-card"><span>🧁</span><h3>{productos.length}</h3><p>Total de productos</p></div>
            <div className="estadistica-card"><span>♡</span><h3>{clientes.length}</h3><p>Total de clientes</p></div>
            <div className="estadistica-card"><span>✿</span><h3>{activos.length}</h3><p>Productos disponibles</p></div>
            <div className="estadistica-card"><span>Bs.</span><h3>{totalPrecio.toFixed(2)}</h3><p>Valor acumulado de precios activos</p></div>
          </div>
          <h3>Productos activos por categoría</h3>
          <div className="reporte-categorias">{CATEGORIAS.map(cat => {
            const cantidad = activos.filter(p => p.categoria === cat).length;
            const porcentaje = activos.length ? (cantidad / activos.length) * 100 : 0;
            return <div className="reporte-fila" key={cat}><span>{cat}</span><div className="barra-fondo"><div className="barra-progreso" style={{ width: `${porcentaje}%` }} /></div><strong>{cantidad}</strong><small>{porcentaje.toFixed(0)}%</small></div>;
          })}</div>
          <h3>Detalle de productos</h3>
          <div className="tabla-contenedor"><table><thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Estado</th></tr></thead><tbody>{productos.map(p => <tr key={p.id}><td>{p.nombre}</td><td>{p.categoria}</td><td>Bs. {Number(p.precio).toFixed(2)}</td><td>{p.activo ? 'Activo' : 'Inactivo'}</td></tr>)}</tbody></table></div>
          <p className="nota-reporte">Este informe utiliza los datos de demostración guardados en este navegador.</p>
        </section>}
      </main>
    </div>
  );
}

export default Admin;
