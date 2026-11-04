
import { useState } from 'react';
import ProductCard from './ProductCard';

function Menu({ productos }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  const categorias = [
    "Todos",
    "Pasteles",
    "Postres",
    "Bebidas",
    "Especiales"
  ];

  const productosFiltrados = productos.filter((producto) => {
    return (
      producto.activo &&
      (categoriaSeleccionada === "Todos" ||
        producto.categoria === categoriaSeleccionada)
    );
  });

  return (
    <section className="menu-section" id="menu">
      <h2>Nuestro menú</h2>

      <div className="categorias">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={
              categoriaSeleccionada === categoria
                ? "categoria-btn activa"
                : "categoria-btn"
            }
            onClick={() => setCategoriaSeleccionada(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      <div className="productos-grid">
        {productosFiltrados.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  );
}

export default Menu;
