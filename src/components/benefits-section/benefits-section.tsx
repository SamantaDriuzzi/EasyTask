import benefits from "@/utils/benefits-section/benefits";
import Image from "next/image";

const BenefitsSection = () => {
  return (
    <div id="section-benefits" className="bg-gradient-benefits min-h-screen">
      <div className="flex flex-col items-center w-full md:px-0 ">
        <div className="w-full md:w-3/4 lg:w-1/2 text-xl md:text-2xl text-white text-center">
          <p>
            En EasyTasks, creemos que un equipo saludable es un equipo
            productivo.
          </p>
          <p>
            Nuestra plataforma no solo te ayuda a organizar y gestionar tus
            tareas, sino que también se preocupa por tu bienestar.
          </p>
          <p>Descubre cómo EasyTasks puede transformar tu jornada laboral.</p>
        </div>
        <div className="flex w-5/6 mt-8 text-black">
          <div className="flex  justify-center flex-wrap w-full gap-8 text-xl">
            {benefits.map((benefit) => (
              <div
                className="w-full text-2xl justify-between sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center p-4"
                key={benefit.id}
              >
                <div className="text-center mb-4">{benefit.title}</div>
                <div>
                  <Image
                    src={benefit.image}
                    alt={benefit.alt}
                    width={250}
                    height={250}
                    className="rounded-md w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
