import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  tortasPersonalizadas,
  tortasVaso,
  alfajoresYGalletas
} from "../data/productos";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import PedidoExitosoModal from "../components/PedidoExitosoModal";

function FormularioPedido() {
  const [searchParams] = useSearchParams();

  const [mostrarModal, setMostrarModal] = useState(false);

  const tipoInicial = searchParams.get("tipo") || "torta";
  const productoInicial = searchParams.get("producto") || "";

  const [tipo, setTipo] = useState(tipoInicial);
  const [producto, setProducto] = useState(productoInicial);
  const [tamaño, setTamaño] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");

  // Calcular fecha mínima para entrega (7 días desde hoy)
  const hoy = new Date();
  const fechaMinima = new Date(hoy);
  fechaMinima.setDate(hoy.getDate() + 7);
  const fechaMinimaStr = fechaMinima.toISOString().split("T")[0];

  const obtenerOpciones = () => {
    if (tipo === "torta") return tortasPersonalizadas;
    if (tipo === "vaso") return tortasVaso;
    return alfajoresYGalletas;
  };

  const productos = obtenerOpciones();
  const seleccionado = productos.find((p) => p.nombre === producto);

  const tamañosDisponibles =
    tipo === "torta"
      ? Object.keys(seleccionado?.tamaños || {})
      : tipo === "vaso"
      ? ["unidad"]
      : ["unidad", "pack12"];

  const calcularPrecio = () => {
    if (!seleccionado) return 0;
    if (tipo === "torta") return seleccionado.tamaños[tamaño] || 0;
    return seleccionado.precio || 0;
  };

  const total = calcularPrecio();
  const abono = total / 2;

  const mensajePlano = `Hola Nicki, quiero pedir una ${tipo === "torta" ? "torta personalizada" : tipo}:
- Producto: ${producto}
${tipo === "torta" ? `- Tamaño: ${tamaño} personas` : ""}
- Precio total: $${total}
- Abono: $${abono}
- Fecha estimada de entrega: ${fechaEntrega || "por definir"}

¿Está disponible para esa fecha? 😊🍰`;

  const mensajeCodificado = encodeURIComponent(mensajePlano);

  const enviarWhatsApp = async () => {
    if (!producto || (tipo === "torta" && !tamaño)) {
      alert("Por favor completa todos los campos antes de continuar.");
      return;
    }

    await guardarPedido();

    const url = `https://wa.me/56974062743?text=${mensajeCodificado}`;
    window.open(url, "_blank");
  };

  const guardarPedido = async () => {
    try {
      await addDoc(collection(db, "pedidos"), {
        tipo,
        producto,
        tamaño,
        precio: total,
        abono,
        fechaEstimada: fechaEntrega || "no definida",
        fecha: Timestamp.now()
      });
      console.log("✅ Pedido guardado en Firebase");
      setMostrarModal(true); // Mostrar el modal
    } catch (error) {
      console.error("❌ Error al guardar el pedido:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
        Personaliza tu pedido
      </h2>

      <p className="text-sm text-red-600 font-medium text-center mb-6">
        🕒 Todos los pedidos deben hacerse con mínimo 7 días de anticipación.
      </p>

      {/* Tipo de producto */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Tipo de producto</label>
        <select
          value={tipo}
          onChange={(e) => {
            setTipo(e.target.value);
            setProducto("");
            setTamaño("");
          }}
          className="w-full p-2 border rounded bg-purple-50 focus:outline-purple-500"
        >
          <option value="torta">Torta personalizada</option>
          <option value="vaso">Torta en vaso</option>
          <option value="alfajor">Alfajor / Galleta</option>
        </select>
      </div>

      {/* Producto */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Elige tu {tipo}</label>
        <select
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
          className="w-full p-2 border rounded bg-purple-50 focus:outline-purple-500"
        >
          <option value="">-- Seleccionar --</option>
          {productos.map((p, i) => (
            <option key={i} value={p.nombre}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Tamaño */}
      {tipo === "torta" && producto && (
        <div className="mb-4">
          <label className="block font-medium mb-1">Tamaño</label>
          <select
            value={tamaño}
            onChange={(e) => setTamaño(e.target.value)}
            className="w-full p-2 border rounded bg-purple-50 focus:outline-purple-500"
          >
            <option value="">-- Seleccionar --</option>
            {tamañosDisponibles.map((t, i) => (
              <option key={i} value={t}>
                {t} personas
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Fecha */}
      {producto && (
        <div className="mb-4">
          <label className="block font-medium mb-1">Fecha estimada de entrega</label>
          <div className="relative">
            <input
              type="date"
              min={fechaMinimaStr}
              value={fechaEntrega}
              onChange={(e) => setFechaEntrega(e.target.value)}
              className="w-full p-2 border rounded pr-10 bg-purple-50 focus:outline-purple-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 italic">
            * Solo puedes seleccionar fechas desde el {fechaMinimaStr}
          </p>
        </div>
      )}

      {/* Detalles */}
      {producto && (
        <>
          {seleccionado?.relleno && (
            <div className="text-sm text-gray-600 mb-2 italic">
              Ingredientes: {seleccionado.relleno}
            </div>
          )}
          {seleccionado?.ingredientes && (
            <div className="text-sm text-gray-600 mb-2 italic">
              Ingredientes: {seleccionado.ingredientes}
            </div>
          )}

          <div className="text-center mb-4">
            <p className="text-lg font-semibold text-gray-700">
              Total: <span className="text-purple-700">${total}</span>
            </p>
            <p className="text-sm text-gray-500">
              Abono: <span className="font-medium">${abono}</span> (50%)
            </p>
          </div>

          {/* Botones */}
          <div className="flex flex-col gap-2">
            <button
              onClick={enviarWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded shadow transition"
            >
              Enviar por WhatsApp
            </button>

            <a
              href={`mailto:dulzuras.nickynicole@gmail.com?subject=Encargo de ${producto}&body=${mensajeCodificado}`}
              className="block text-center text-sm text-purple-600 hover:underline"
            >
              ¿Prefieres enviar por correo?
            </a>

            <button
              onClick={async () => {
                if (!producto || (tipo === "torta" && !tamaño)) {
                  alert("Por favor completa todos los campos.");
                  return;
                }
                await guardarPedido();
                setMostrarModal(true);
              }}
              className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 rounded border shadow-sm transition"
            >
              Enviar directamente desde aquí
            </button>
          </div>
        </>
      )}

      {/* Modal de confirmación */}
      {mostrarModal && <PedidoExitosoModal onClose={() => setMostrarModal(false)} />}
    </div>
  );
}

export default FormularioPedido;
