import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  tortasPersonalizadas,
  tortasVaso,
  alfajoresYGalletas
} from "../data/productos";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";


function FormularioPedido() {
  const [searchParams] = useSearchParams();

  const tipoInicial = searchParams.get("tipo") || "torta";
  const productoInicial = searchParams.get("producto") || "";

  const [tipo, setTipo] = useState(tipoInicial);
  const [producto, setProducto] = useState(productoInicial);
  const [tamaño, setTamaño] = useState("");

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

  const mensajeWhatsApp = `Hola Nicki, quiero pedir una ${tipo === "torta" ? "torta personalizada" : tipo}:
- Producto: ${producto}
${tipo === "torta" ? `- Tamaño: ${tamaño} personas` : ""}
- Precio total: $${total}
- Abono: $${abono}
¿Está disponible para la fecha estimada?`;

  const enviarWhatsApp = async () => {
    await guardarPedido();

    const url = `https://wa.me/56974062743?text=${encodeURIComponent(mensajeWhatsApp)}`;
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
        fecha: Timestamp.now()
      });
      console.log("✅ Pedido guardado en Firebase");
    } catch (error) {
      console.error("❌ Error al guardar el pedido:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
        Personaliza tu pedido
      </h2>

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
          className="w-full p-2 border rounded"
        >
          <option value="torta">Torta personalizada</option>
          <option value="vaso">Torta en vaso</option>
          <option value="alfajor">Alfajor / Galleta</option>
        </select>
      </div>

      {/* Nombre de producto */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Elige tu {tipo}</label>
        <select
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Seleccionar --</option>
          {productos.map((p, i) => (
            <option key={i} value={p.nombre}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Tamaño (solo para tortas) */}
      {tipo === "torta" && producto && (
        <div className="mb-4">
          <label className="block font-medium mb-1">Tamaño</label>
          <select
            value={tamaño}
            onChange={(e) => setTamaño(e.target.value)}
            className="w-full p-2 border rounded"
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

      {/* Detalles y precio */}
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

          <button
            onClick={enviarWhatsApp}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
          >
            Enviar pedido por WhatsApp
          </button>
        </>
      )}
    </div>
  );
}

export default FormularioPedido;
