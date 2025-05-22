import { useState, useEffect } from "react";

const imagenes = [
  "/pastel1.jpg",
  "/pastel2.jpg",
  "/pastel3.jpg"
];

function Carrusel() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % imagenes.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  const cambiarSlide = (dir) => {
    setActual((prev) =>
      dir === "izq"
        ? (prev - 1 + imagenes.length) % imagenes.length
        : (prev + 1) % imagenes.length
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-8 overflow-hidden rounded-lg shadow-lg">
      <img
        src={imagenes[actual]}
        alt={`Pastel ${actual + 1}`}
        className="w-full h-[400px] object-cover transition-all duration-700"
      />

      {/* Botones */}
      <button
        onClick={() => cambiarSlide("izq")}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/60 hover:bg-white text-pink-700 px-3 py-1 rounded-full"
      >
        ◀
      </button>
      <button
        onClick={() => cambiarSlide("der")}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/60 hover:bg-white text-pink-700 px-3 py-1 rounded-full"
      >
        ▶
      </button>
    </div>
  );
}

export default Carrusel;
