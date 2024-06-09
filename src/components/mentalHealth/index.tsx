import { GatoEstres, GatoProductivo, GatoSobrecarga } from "./img";

const MentalHealth = () => {
  return (
    <section className="flex flex-col justify-center items-center p-5 bg-gradient-to-b from-color1 via-color2 to-color3 h-sreen ">
      <h2 className="text-4xl font-bold mt-9 my-5">
        La importancia de una buena gestión de tareas
      </h2>
      <div className="flex flex-col justify-center items-center w-[60%] mb-4 text-2xl text-center">
        <p>
          En el entorno laboral actual, la salud mental de los empleados es una
          prioridad crucial.
        </p>
        <br />
        <p>
          Aquí te presentamos estadísticas clave que demuestran cómo la
          sobrecarga laboral afecta la salud mental y cómo una gestión efectiva
          de tareas puede ser la solución.
        </p>
      </div>

      <div className="flex justify-center items-center w-[80%]">
        <div className="flex flex-col my-5">
          <div className="flex  flex-col my-2 overflow-hidden w-full transition-transform duration-300 transform hover:scale-125">
            <GatoEstres />
          </div>
          <div className="overflow-hidden w-full transition-transform duration-300 transform hover:scale-125">
            <GatoSobrecarga />
          </div>
          <div className="overflow-hidden w-full transition-transform duration-300 transform hover:scale-125 mt-10 ">
            <GatoProductivo />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center m-5">
          <div className="flex flex-col my-10 text-lg">
            <h3 className="font-semibold my-1 text-3xl">ESTRÉS LABORAL</h3>
            <ul className="list-disc list-inside w-[95%] text-2xl">
              <li className="ml-4">
                &quot;El 76% de los empleados experimentan estrés relacionado
                con el trabajo que afecta su salud física y mental.&quot;
                (Fuente: American Institute of Stress)
              </li>
              <li className="ml-4">
                &quot;El estrés laboral contribuye a un 40% de los casos de
                insomnio.&quot; (Fuente: National Sleep Foundation)
              </li>
            </ul>
          </div>
          <div className="flex flex-col  my-10 text-lg">
            <h3 className="font-semibold my-1 text-3xl">
              SOBRECARGA DE TRABAJO
            </h3>
            <ul className="list-disc list-inside w-[95%] text-2xl">
              <li className="ml-4">
                &quot;El 60% de los empleados sienten que su carga de trabajo es
                demasiado pesada, lo que afecta su rendimiento y
                bienestar.&quot; (Fuente: Gallup)
              </li>
              <li className="ml-4">
                &quot;La sobrecarga laboral está asociada con un aumento del 50%
                en el riesgo de depresión y ansiedad.&quot; (Fuente:
                Occupational Health Psychology)
              </li>
            </ul>
          </div>
          <div className="flex flex-col  my-10 text-lg">
            <h3 className="font-semibold my-1 text-3xl">
              PRODUCTIVIDAD Y BIENESTAR
            </h3>
            <ul className="list-disc list-inside w-[95%] text-2xl">
              <li className="ml-4">
                &quot;Empresas que priorizan la salud mental de sus empleados
                observan un aumento del 20% en la productividad.&quot; (Fuente:
                WHO)
              </li>
              <li className="ml-4">
                &quot;Equipos con una gestión de tareas eficaz reportan un 30%
                menos de ausentismo por motivos de salud mental.&quot; (Fuente:
                Harvard Business Review)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MentalHealth;
