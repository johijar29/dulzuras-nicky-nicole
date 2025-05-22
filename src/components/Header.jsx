import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Header() {
  const [showCatalogo, setShowCatalogo] = useState(false);
  const catalogoRef = useRef();
  const location = useLocation();

  // Cierra el menú cuando cambia la ruta
  useEffect(() => {
    setShowCatalogo(false);
  }, [location]);

  // Cierra el menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (catalogoRef.current && !catalogoRef.current.contains(event.target)) {
        setShowCatalogo(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-purple-100 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-purple-800 tracking-tight">
          Dulzuras de Nicky Nicole
        </Link>

        <nav className="relative flex gap-6 text-sm md:text-base text-purple-700 font-medium">
          {/* Catálogo con submenú */}
          <div className="relative" ref={catalogoRef}>
            <button
              onClick={() => setShowCatalogo((prev) => !prev)}
              className="hover:text-purple-900 transition"
            >
              Catálogo ▾
            </button>
            {showCatalogo && (
              <div className="absolute bg-white shadow-md mt-2 rounded-lg w-48 p-2 z-50">
                <Link
                  to="/catalogo"
                  className="block px-4 py-2 hover:bg-purple-50 rounded"
                >
                  Tortas Personalizadas
                </Link>
                <Link
                  to="/catalogo/vaso"
                  className="block px-4 py-2 hover:bg-purple-50 rounded"
                >
                  Tortas en Vaso
                </Link>
                <Link
                  to="/catalogo/alfajor"
                  className="block px-4 py-2 hover:bg-purple-50 rounded"
                >
                  Alfajores y Galletas
                </Link>
              </div>
            )}
          </div>

          {/* Otras secciones */}
          <Link to="/formulario" className="hover:text-purple-900 transition">
            Personalizar
          </Link>
          <Link to="/sobre-mi" className="hover:text-purple-900 transition">
            Sobre mí
          </Link>
          <Link to="/contacto" className="hover:text-purple-900 transition">
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
