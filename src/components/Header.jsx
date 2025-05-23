import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [showCatalogo, setShowCatalogo] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const catalogoRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setShowCatalogo(false);
    setMenuAbierto(false);
  }, [location]);

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
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo + Nombre */}
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <img
            src="/logo-nicky-transparent.png"
            alt="Logo"
            className="h-10 w-auto object-contain drop-shadow-sm"
          />
          <span className="text-xl md:text-2xl font-extrabold text-purple-800 tracking-tight whitespace-nowrap">
            Dulzuras de Nicky Nicole
          </span>
        </Link>

        {/* Menú desktop */}
        <nav className="hidden md:flex gap-6 text-sm md:text-base text-purple-700 font-medium">
          <div className="relative" ref={catalogoRef}>
            <button
              onClick={() => setShowCatalogo((prev) => !prev)}
              className="hover:text-purple-900 transition"
            >
              Catálogo ▾
            </button>
            {showCatalogo && (
              <div className="absolute bg-white shadow-md mt-2 rounded-lg w-52 p-2 z-50">
                <Link
                  to="/catalogo/torta"
                  onClick={() => setShowCatalogo(false)}
                  className="block px-4 py-2 hover:bg-purple-50 rounded"
                >
                  Tortas Personalizadas
                </Link>
                <Link
                  to="/catalogo/vaso"
                  onClick={() => setShowCatalogo(false)}
                  className="block px-4 py-2 hover:bg-purple-50 rounded"
                >
                  Tortas en Vaso
                </Link>
                <Link
                  to="/catalogo/alfajor"
                  onClick={() => setShowCatalogo(false)}
                  className="block px-4 py-2 hover:bg-purple-50 rounded"
                >
                  Alfajores y Galletas
                </Link>
              </div>
            )}

          </div>

          <Link to="/formulario" className="hover:text-purple-900 transition">Personalizar</Link>
          <Link to="/sobre-mi" className="hover:text-purple-900 transition">Sobre mí</Link>
          <Link to="/contacto" className="hover:text-purple-900 transition">Contacto</Link>
        </nav>

        {/* Menú móvil (hamburguesa) */}
        <div className="md:hidden">
          <button onClick={() => setMenuAbierto(!menuAbierto)}>
            {menuAbierto ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {menuAbierto && (
        <div className="bg-white shadow-md md:hidden flex flex-col gap-4 text-center py-4 text-purple-700 text-base">
          <Link to="/catalogo">Tortas Personalizadas</Link>
          <Link to="/catalogo/vaso">Tortas en Vaso</Link>
          <Link to="/catalogo/alfajor">Alfajores y Galletas</Link>
          <Link to="/formulario">Personalizar</Link>
          <Link to="/sobre-mi">Sobre mí</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
