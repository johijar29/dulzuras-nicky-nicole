import { useState, useEffect } from "react";
import TortaModal from "./TortaModal"; // reutilizas el que ya tienes

const slides = [
  {
    imagen: "/assets/tortas/choco-manjar-frutilla.jpg",
    titulo: "Torta Frambuesa Blue",
    texto: "Suave bizcocho con frambuesas, perfecta para momentos especiales 💙",
    precio: 35000
  },
  {
    imagen: "/assets/tortas/tortadebebe.jpg",
    titulo: "Torta Nicky Mor",
    texto: "Nuestro ícono 💜 Dulzura, diseño y amor pastelero",
    precio: 37000
  },
  {
    imagen: "/assets/tortas/manjar-nuez.jpg",
    titulo: "Torta Primavera",
    texto: "Colores vibrantes y sabor fresco ☀️🌼",
    precio: 36000
  }
];

function Carrusel() {
  const [actual, setActual] = useState(0);
  const [tortaSeleccionada, setTortaSeleccionada] = useState(null);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const cambiarSlide = (dir) => {
    setActual((prev) =>
      dir === "izq"
        ? (prev - 1 + slides.length) % slides.length
        : (prev + 1) % slides.length
    );
  };

  const actualSlide = slides[actual];

  return (
    <>
      <div
        className="relative w-full max-w-5xl mx-auto mt-8 overflow-hidden rounded-xl shadow-lg group cursor-pointer"
        onClick={() => setTortaSeleccionada(actualSlide)}
      >
        <img
          src={actualSlide.imagen}
          alt={actualSlide.titulo}
          className="w-full h-[420px] object-cover transition-all duration-700"
        />

        {/* Overlay de texto visible en hover o por defecto en móvil */}
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-2xl font-bold">{actualSlide.titulo}</h3>
          <p className="text-sm">{actualSlide.texto}</p>
          <p className="text-sm mt-1 italic">Desde ${actualSlide.precio}</p>
          <p className="text-sm mt-3 underline">Haz clic para ver más</p>
        </div>

        {/* Botones navegación */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            cambiarSlide("izq");
          }}
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/60 hover:bg-white text-purple-700 px-3 py-1 rounded-full"
        >
          ◀
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            cambiarSlide("der");
          }}
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/60 hover:bg-white text-purple-700 px-3 py-1 rounded-full"
        >
          ▶
        </button>
      </div>

      {/* Modal */}
      <TortaModal
        torta={tortaSeleccionada}
        onClose={() => setTortaSeleccionada(null)}
      />
    </>
  );
}

export default Carrusel;
