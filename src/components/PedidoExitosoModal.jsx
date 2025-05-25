// PedidoExitosoModal.jsx
function PedidoExitosoModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl p-6 text-center max-w-sm w-full">
        <h2 className="text-2xl font-bold text-purple-700 mb-2">¡Gracias por tu pedido! ✨</h2>
        <p className="text-sm text-gray-600 mb-4">
          Hemos recibido tu solicitud. Pronto nos pondremos en contacto contigo para confirmar todo 💜
        </p>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default PedidoExitosoModal;
