const InformacionPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="bg-[#B4B3EA] py-10">
        <h2 className="text-2xl font-bold text-left text-black ml-6 mt-14">
          Información
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow py-8">
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 w-full max-w-6xl">
          <div className="flex justify-between mb-6">
            <h3 className="text-xl font-semibold">Proyecto EasyTasks</h3>
            <div className="text-right">
              <p>CREACIÓN: DD/MM/AAAA 00:00</p>
              <p>FINALIZACIÓN: DD/MM/AAAA 00:00</p>
            </div>
          </div>
          <div className="mb-8">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              DESCRIPCIÓN:
            </label>
            <div className="bg-notebook-lines p-2 border border-gray-300 rounded-md mt-3 resize-none text-center mx-auto w-10/12">
              <p className="mb-3">
                Este es un proyecto de ejemplo para EasyTasks. Aquí se muestra
                la descripción del proyecto que se actualiza cuando se crea el
                proyecto.
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">MIEMBROS:</h4>
            <div className="flex items-center space-x-8">
              <div className="flex flex-col items-center">
                <span className="text-sm">Líder</span>
                <div className="bg-[#329FA6] w-24 h-24 rounded-full flex items-center justify-center text-white font-semibold">
                  <span>Líder</span>
                </div>
                <span className="mt-2">Nombre del Líder</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm">Colaboradores</span>
                <div className="bg-[#AF87EA] w-24 h-24 rounded-full flex items-center justify-center text-white font-semibold">
                  <span>Cola1</span>
                </div>
                <span className="mt-2">Nombre 1</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-[#4A48A4] w-24 h-24 rounded-full flex items-center justify-center text-white font-semibold">
                  <span>Cola2</span>
                </div>
                <span className="mt-2">Nombre 2</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-[#C99090] w-24 h-24 rounded-full flex items-center justify-center text-white font-semibold">
                  <span>Cola3</span>
                </div>
                <span className="mt-2">Nombre 3</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-[#373661] w-24 h-24 rounded-full flex items-center justify-center text-white font-semibold">
                  <span>Cola4</span>
                </div>
                <span className="mt-2">Nombre 4</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button className="bg-[#329FA6] hover:bg-[#267d84] text-white font-bold py-3 px-6 rounded-lg">
              TABLERO
            </button>
          </div>
          <ChatButton />
        </div>
      </div>
    </div>
  );
};

export default InformacionPage;
