import Carrusel from "./components/Carrusel";
import TortaCard from "./components/TortaCard";

function App() {
  return (
    <>
      <Carrusel />

      {/* Sección bienvenida */}
      <main className="pt-10 px-6 text-center">
        <img
          src="/logo-nicky.png"
          alt="Logo Dulzuras de Nicky Nicole"
          className="mx-auto h-32 mb-4"
        />
        <h1 className="text-4xl font-bold text-purple-700 mb-2">
          Bienvenidos a Dulzuras de Nicky Nicole
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Tortas personalizadas hechas con amor en Puente Alto 🍓✨
          <br /> ¡Reserva con anticipación y endulza tus momentos!
        </p>
      </main>

      {/* Destacados */}
      <section className="mt-14 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Tortas destacadas 🍰
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <TortaCard
            imagen="/pastel1.jpg"
            nombre="Torta Frambuesa Blue"
            descripcion="Bizcocho suave, frambuesas y estilo único 💙"
          />
          <TortaCard
            imagen="/pastel2.jpg"
            nombre="Torta Morada"
            descripcion="Decoración especial y tonos de Nicki 💜"
          />
          <TortaCard
            imagen="/pastel3.jpg"
            nombre="Torta Primavera"
            descripcion="Colores vibrantes, ideal para compartir ☀️🌼"
          />
        </div>
      </section>
    </>
  );
}

export default App;
