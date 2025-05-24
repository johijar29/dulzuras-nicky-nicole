import { useState } from "react";
import TortaCard from "./components/TortaCard";
import Carrusel from "./components/Carrusel";
import TortaModal from "./components/TortaModal"; // nuevo

function App() {
  const [tortaSeleccionada, setTortaSeleccionada] = useState(null);

  const tortasDestacadas = [
    {
      nombre: "Torta Frambuesa Blue",
      descripcion: "Bizcocho suave, frambuesas y estilo único 💙",
      imagen: "/assets/tortas/choco-manjar-frutilla.jpg",
      precio: 35000
    },
    {
      nombre: "Torta Nicky Mor",
      descripcion: "Decoración especial y tonos de Nicky 💜",
      imagen: "/assets/tortas/tortadebebe.jpg",
      precio: 37000
    },
    {
      nombre: "Torta Primavera",
      descripcion: "Colores vibrantes, ideal para compartir ☀️🌼",
      imagen: "/assets/tortas/manjar-nuez.jpg",
      precio: 36000
    }
  ];

  return (
    <>
      <Carrusel />

      <main className="pt-10 px-6 text-center">
        <img
          src="/logo-nicky-transparent.png"
          alt="Logo Dulzuras de Nicky Nicole"
          className="h-32 w-32 object-cover rounded-full border-4 border-purple-300 shadow-lg mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-purple-700 mb-2">
          Bienvenidos a Dulzuras de Nicky Nicole
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Tortas personalizadas hechas con amor en Puente Alto 🍓✨
          <br /> ¡Reserva con anticipación y endulza tus momentos!
        </p>
      </main>

      <section className="mt-14 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Tortas destacadas 🍰
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {tortasDestacadas.map((torta, i) => (
            <div key={i} onClick={() => setTortaSeleccionada(torta)}>
              <TortaCard {...torta} />
            </div>
          ))}
        </div>
      </section>

      <TortaModal torta={tortaSeleccionada} onClose={() => setTortaSeleccionada(null)} />
    </>
  );
}

export default App;
