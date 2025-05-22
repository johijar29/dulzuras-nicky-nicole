import Carrusel from "./components/Carrusel";
import TortaCard from "./components/TortaCard";

function App() {
  return (
    <>
      <Carrusel />

      <main className="pt-10 px-6 text-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-2">
          ¡Bienvenido a Dulzuras de Nicky Nicole!
        </h2>
        <p className="text-lg text-gray-600">
          Explora nuestras tortas, sabores y opciones personalizadas 🍰
        </p>
      </main>

      <section className="mt-10 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
          Tortas destacadas 🍰
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <TortaCard
            imagen="/pastel1.jpg"
            nombre="Torta de Frambuesa"
            descripcion="Suave bizcocho relleno con crema y frambuesa natural"
          />
          <TortaCard
            imagen="/pastel2.jpg"
            nombre="Torta Chocolover"
            descripcion="Triple chocolate con centro húmedo y decoración especial"
          />
          <TortaCard
            imagen="/pastel3.jpg"
            nombre="Torta Morada de Nicki"
            descripcion="Especialidad de la casa 💜 con amor y estilo único"
          />
        </div>
      </section>
    </>
  );
}

export default App;
