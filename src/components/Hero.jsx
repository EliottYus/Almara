function Hero() {
  return (
    <section className="hero" id="inicio">

      <div className="hero-texto">

        <span className="etiqueta">
          ✿ Un rinconcito lleno de dulzura ✿
        </span>

        <h1>
          Momentos dulces,
          <br />
          recuerdos <span>bonitos.</span>
        </h1>

        <p>
          Un pequeño mundo de sabores, colores y dulces
          momentos. Descubre todo lo que tenemos preparado
          para ti.
        </p>

        <div className="hero-botones">

          <a href="#menu" className="boton-principal">
            Descubrir menú ♡
          </a>

          <a href="#nosotros" className="boton-secundario">
            Conócenos
          </a>

        </div>

        <div className="hero-detalle">
          ♡ Hecho para endulzar tus días ♡
        </div>

      </div>

      <div className="hero-imagen">

        <img
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900"
          alt="Pastel de chocolate"
        />

        <div className="flotante">
          ✨ Un poquito de felicidad
        </div>

        <span className="decoracion decoracion-1">♡</span>
        <span className="decoracion decoracion-2">✿</span>

      </div>

    </section>
  );
}

export default Hero;