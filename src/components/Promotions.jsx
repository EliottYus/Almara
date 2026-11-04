function Promotions() {
  return (

    <section className="promociones-section" id="promociones">

      <div className="titulo-section">

        <span className="subtitulo">
          OFERTAS CON MUCHO CARIÑO
        </span>

        <h2>
          Nuestras <span>promociones</span>
        </h2>

        <p>
          Pequeños antojos, precios especiales y mucha dulzura.
        </p>

      </div>

      <div className="promociones-grid">

        <article className="promo-card">

          <div className="promo-imagen">

            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
              alt="Pastel de chocolate"
            />

            <span className="promo-etiqueta">
              ¡Oferta especial!
            </span>

          </div>

          <div className="promo-info">

            <h3>Dulce momento ♡</h3>

            <p>
              Una deliciosa sorpresa para compartir.
            </p>

            <div className="promo-precios">

              <span className="precio-anterior">
                Bs. 38
              </span>

              <span className="precio-actual">
                Bs. 30
              </span>

            </div>

          </div>

        </article>

        <article className="promo-card">

          <div className="promo-imagen">

            <img
              src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600"
              alt="Café y postre"
            />

            <span className="promo-etiqueta">
              Combo especial
            </span>

          </div>

          <div className="promo-info">

            <h3>Momento de café ✿</h3>

            <p>
              Una bebida y algo dulce para acompañar.
            </p>

            <div className="promo-precios">

              <span className="precio-anterior">
                Bs. 32
              </span>

              <span className="precio-actual">
                Bs. 25
              </span>

            </div>

          </div>

        </article>

      </div>

    </section>
  );
}

export default Promotions;