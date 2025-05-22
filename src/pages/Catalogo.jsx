import { Link } from "react-router-dom";
import { useState } from "react";
import {
  tortasPersonalizadas,
  tortasVaso,
  alfajoresYGalletas
} from "../data/productos";

function Catalogo() {
  const [categoria, setCategoria] = useState("tortas");
  const [filtro, setFiltro] = useState("todos");

  const tortasFiltradas = tortasPersonalizadas.filter((torta) => {
    if (filtro === "todos") return true;
    return torta.relleno.toLowerCase().includes(filtro);
  });

  return (
    <section className="mt-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-700 text-center mb-8">
        Catálogo de Dulzuras
      </h2>

      {/* Tabs de categoría */}
      <div className="mb-6 flex justify-center gap-4">
        {[
          { key: "tortas", label: "Tortas Personalizadas" },
          { key: "vaso", label: "Tortas en Vaso" },
          { key: "alfajores", label: "Alfajores y Galletas" }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => {
              setCategoria(key);
              setFiltro("todos");
            }}
            className={`px-4 py-2 rounded-full font-medium transition border ${
              categoria === key
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-purple-700 border-purple-300 hover:bg-purple-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Filtro solo si estás en tortas */}
      {categoria === "tortas" && (
        <div className="mb-6 flex flex-wrap gap-4 justify-center">
          {["todos", "frambuesa", "chocolate", "manjar", "durazno"].map((sabor) => (
            <button
              key={sabor}
              onClick={() => setFiltro(sabor)}
              className={`px-4 py-2 rounded-full border transition ${
                filtro === sabor
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-purple-700 border-purple-300 hover:bg-purple-50"
              }`}
            >
              {sabor.charAt(0).toUpperCase() + sabor.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Render según categoría */}
      <div className="grid md:grid-cols-3 gap-6">
        {categoria === "tortas" &&
          tortasFiltradas.map((torta, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between"
            >
              <img
                src={`/pastel${(i % 3) + 1}.jpg`}
                alt={torta.nombre}
                className="h-48 w-full object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold text-purple-700 mb-1">{torta.nombre}</h3>
              <p className="text-sm text-gray-600 mb-2 italic">{torta.relleno}</p>
              <p className="text-sm font-semibold text-gray-800">
                Desde: ${Math.min(...Object.values(torta.tamaños))}
              </p>
              <Link
                to={`/formulario?tipo=torta&producto=${encodeURIComponent(torta.nombre)}`}
                className="mt-4 bg-purple-600 text-white text-center py-2 rounded hover:bg-purple-700"
              >
                Personalizar
              </Link>
            </div>
          ))}

        {categoria === "vaso" &&
          tortasVaso.map((vaso, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between"
            >
              <h3 className="text-xl font-bold text-purple-700 mb-1">{vaso.nombre}</h3>
              <p className="text-sm text-gray-600 mb-2 italic">{vaso.ingredientes}</p>
              <p className="text-sm font-semibold text-gray-800 mb-2">
                Precio unidad: ${vaso.precio}
              </p>
              <Link
                to={`/formulario?tipo=vaso&producto=${encodeURIComponent(vaso.nombre)}`}
                className="mt-4 bg-purple-600 text-white text-center py-2 rounded hover:bg-purple-700"
              >
                Pedir este vaso
              </Link>
            </div>
          ))}

        {categoria === "alfajores" &&
          alfajoresYGalletas.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between"
            >
              <h3 className="text-xl font-bold text-purple-700 mb-1">{item.nombre}</h3>
              <p className="text-sm text-gray-600 mb-2 italic">{item.ingredientes}</p>
              <p className="text-sm font-semibold text-gray-800 mb-2">
                Precio: ${item.precio}
              </p>
              <Link
                to={`/formulario?tipo=alfajor&producto=${encodeURIComponent(item.nombre)}`}
                className="mt-4 bg-purple-600 text-white text-center py-2 rounded hover:bg-purple-700"
              >
                Encargar
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Catalogo;
