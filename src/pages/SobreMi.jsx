function SobreMi() {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center text-gray-800">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Sobre mí</h2>

      <img
        src="/assets/nicky1.jpg"
        alt="Nicky Nicole"
        className="w-40 h-40 mx-auto rounded-full object-cover shadow-md border-4 border-purple-300 mb-4"
      />

      <p className="mb-4">
        Hola, soy <span className="font-semibold text-purple-600">Nicky Nicole</span>, pastelera independiente desde el 2021 y creadora de <span className="italic">Dulzuras de Nicky Nicole</span>. Comencé este hermoso camino atendiendo a un grupo de adultos mayores que necesitaban servicios de repostería... y desde entonces no he parado.
      </p>

      <p className="mb-4">
        Cada pastel que realizo está inspirado en la personalidad de quien lo recibe. Me encanta dejar un sello único en cada creación, y disfruto especialmente los desafíos creativos que me permiten innovar.
      </p>

      <p className="mb-4">
        Mi primer encargo importante fue una torta de dos pisos con temática neón... ¡y desde ahí supe que esto era lo mío!
      </p>

      <p className="mb-4">
        En cada pedido encontrarás <strong>dedicación</strong>, <strong>amor</strong> y, sobre todo, <strong>responsabilidad</strong>. Amo lo que hago y me esfuerzo por que cada dulce detalle cuente.
      </p>

      <blockquote className="italic text-purple-600 mt-6 text-lg">
        “Cada pastel lleva una parte de mi corazón” 💜
      </blockquote>

      {/* 📸 Galería de sus comienzos */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-purple-700 mb-3 text-center">Mis comienzos</h3>
        <p className="text-sm text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Estas tortas marcaron el inicio de mi camino como pastelera. Cada una tiene su historia, su aprendizaje y mucho cariño. 🍰💜
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Torta Neón */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src="/assets/inspiraciones/torta-neon.jpg"
              alt="Torta Neón"
              className="rounded-lg mb-3"
            />
            <h4 className="font-semibold text-purple-600 mb-1 text-lg">Torta Neón 🎉</h4>
            <p className="text-sm text-gray-700">
              La primera torta de dos pisos que hice para el cumpleaños de mi cuñada. Me desafió... y me enseñó que podía lograr lo que soñaba.
            </p>
          </div>

          {/* Torta Harry Potter */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src="/assets/inspiraciones/torta-harry.jpg"
              alt="Torta temática Harry Potter"
              className="rounded-lg mb-3"
            />
            <h4 className="font-semibold text-purple-600 mb-1 text-lg">Torta temática Harry Potter 🧙‍♀️</h4>
            <p className="text-sm text-gray-700">
              Un encargo especial para una amiga fan de Harry Potter. Personalizada con cariño, estilo y mucha magia ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SobreMi;
