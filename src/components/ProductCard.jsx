function ProductCard({ producto }) {

  return (
    <article className="producto-card">

      <div className="producto-imagen">

        <img
          src={producto.imagen}
          alt={producto.nombre}
        />

        <span className="producto-corazon">♡</span>

      </div>

      <div className="producto-info">

        <h3>{producto.nombre}</h3>

        <p>{producto.descripcion}</p>

        <div className="producto-pie">

          <span className="precio">
            Bs. {producto.precio}
          </span>

          <span className="etiqueta-producto">
            {producto.categoria}
          </span>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;