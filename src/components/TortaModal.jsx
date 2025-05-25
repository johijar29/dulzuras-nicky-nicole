import { FaWhatsapp } from "react-icons/fa";

function TortaModal({ torta, onClose }) {
  if (!torta) return null;

  // 🕒 Calculamos la fecha más próxima válida
  const hoy = new Date();
  const fechaMinima = new Date(hoy);
  fechaMinima.setDate(hoy.getDate() + 7);
  const fechaFormateada = fechaMinima.toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long"
  });

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl"
        >
          ×
        </button>

        {/* Imagen */}
        <img
          src={torta.imagen}
          alt={torta.nombre}
          className="w-full h-64 object-contain md:object-cover rounded mb-4"
        />

        {/* Info */}
        <h2 className="text-2xl font-bold text-purple-700 mb-2">{torta.nombre}</h2>
        <p className="text-gray-600 italic mb-2">{torta.descripcion}</p>
        <p className="text-gray-800 font-semibold mb-1">Desde: ${torta.precio}</p>

        {/* Validación de tiempo */}
        <p className="text-sm text-red-500 font-medium mt-2">
          📅 Se reserva con mínimo 7 días de anticipación.
        </p>
        <p className="text-xs text-gray-500 italic mb-3">
          Próxima entrega disponible: {fechaFormateada}
        </p>

        {/* Gancho emocional */}
        <p className="text-sm text-purple-600 text-center mt-2 italic">
          ¡Pedidos personalizados con entrega en Puente Alto! 💜
        </p>

        {/* Botón CTA */}
        <a
          href={`https://wa.me/56974062743?text=¡Hola Nicky! Me encantó la ${torta.nombre}. ¿Está disponible para el ${fechaFormateada}? Quisiera saber cómo encargarla 🥰🍰`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 mt-3 rounded font-medium"
        >
          <FaWhatsapp />
          Encargar ahora por WhatsApp
        </a>

        {/* Validación social */}
        <p className="text-xs text-gray-400 italic mt-3 text-center">
          +100 tortas entregadas con amor 💜 Clientes felices en Puente Alto
        </p>

        {/* Enlace a Instagram */}
        <p className="text-center text-sm mt-4 text-gray-500">
          ¿Aún no decides?{" "}
          <a
            href="https://instagram.com/_dulzuras.nickynicole"
            target="_blank"
            rel="noreferrer"
            className="text-purple-600 hover:underline"
          >
            Mira más ejemplos en Instagram →
          </a>
        </p>
      </div>
    </div>
  );
}

export default TortaModal;
