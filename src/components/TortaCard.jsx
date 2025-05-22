function TortaCard({ imagen, nombre, descripcion }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
      <img src={imagen} alt={nombre} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-pink-600">{nombre}</h3>
        <p className="text-sm text-gray-600">{descripcion}</p>
      </div>
    </div>
  );
}

export default TortaCard;
