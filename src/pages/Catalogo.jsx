import { Link } from "react-router-dom";
import { useState } from "react";
import {
  tortasPersonalizadas,
  tortasVaso,
  alfajoresYGalletas
} from "../data/productos";

function Catalogo() {
  const [categoria, setCategoria] = useState("torta");
  const [filtro, setFiltro] = useState("todos");

  const categorias = {
    torta: {
      label: "Tortas Personalizadas",
      productos: tortasPersonalizadas.filter((torta) => {
        if (filtro === "todos") return true;
        return torta.relleno.toLowerCase().includes(filtro);
      })
    },
    vaso: {
      label: "Tortas en Vaso",
      productos: tortasVaso
    },
    alfajor: {
      label: "Alfajores y Galletas",
      productos: alfajoresYGalletas
    }
  };

  const activa = categorias[categoria];

  return (
    <section className="mt-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
        Catálogo de Dulzuras
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-4 flex-wrap">
        {Object.entries(categorias).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => {
              setCategoria(key);
              setFiltro("todos");
            }}
            className={`px-4 py-2 rounded-full border transition font-medium text-sm md:text-base ${
              categoria === key
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-purple-700 border-purple-300 hover:bg-purple-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filtros de sabor (solo para tortas) */}
      {categoria === "torta" && (
        <div className="mb-6 flex flex-wrap gap-3 justify-center">
          {["todos", "frambuesa", "chocolate", "manjar", "durazno"].map((sabor) => (
            <button
              key={sabor}
              onClick={() => setFiltro(sabor)}
              className={`px-4 py-1.5 rounded-full border text-sm transition ${
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

      {/* Tarjetas */}
      <div className="grid md:grid-cols-3 gap-6">
        {activa.productos.map((producto, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between"
          >
            <img
              src={`/assets/${producto.imagen || "pastel1.jpg"}`}
              alt={producto.nombre}
              className="h-48 w-full object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold text-purple-700 mb-1">
              {producto.nombre}
            </h3>

            {producto.relleno && (
              <p className="text-sm text-gray-600 italic mb-1">{producto.relleno}</p>
            )}
            {producto.ingredientes && (
              <p className="text-sm text-gray-600 italic mb-1">{producto.ingredientes}</p>
            )}
            {producto.descripcion && (
              <p className="text-sm text-gray-500 mb-2">{producto.descripcion}</p>
            )}

            <p className="text-sm font-semibold text-gray-800">
              {producto.tamaños
                ? `Desde: $${Math.min(...Object.values(producto.tamaños))}`
                : `Precio: $${producto.precio}`}
            </p>

            <Link
              to={`/formulario?tipo=${categoria}&producto=${encodeURIComponent(
                producto.nombre
              )}`}
              className="mt-4 bg-purple-600 text-white text-center py-2 rounded hover:bg-purple-700"
            >
              {categoria === "torta" ? "Personalizar" : "Encargar"}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Catalogo;
