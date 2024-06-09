import Image from "next/image.js";

const AboutUs = () => {
  return (
    <div
      id="section-about"
      className="flex flex-col justify-center items-center bg-gradient-to-b from-color3 via-color4 to-color5 h-screen "
    >
      <h2 className="flex flex-col items-center text-4xl font-bold mb-6">
        ¿Quiénes somos?
      </h2>
      <h3 className="flex flex-col items-center text-2xl w-9/12 my-3">
        Somos un grupo de desarrolladores que busca mejorar su productividad sin
        morir en el intento! 😄
      </h3>
      <p className="flex flex-col items-center text-2xl w-7/12 my-3 text-center">
        Creemos firmemente que podemos alcanzar nuestros objetivos profesionales
        sin sobrecargarnos y cuidando nuestra salud mental. Nuestro enfoque se
        centra en el trabajo en equipo, no solo para lograr metas, sino también
        como un mecanismo de apoyo mutuo que previene el agotamiento y la
        soledad laboral.
      </p>
      <p className="flex flex-col items-center text-2xl w-9/12 mt-12 my-3 text-white">
        En EasyTasks, nuestra misión es crear un entorno donde la eficiencia y
        el bienestar vayan de la mano.{" "}
      </p>
      <div className="flex text-white mt-4 ">
        <a
          className="flex flex-col items-center mx-4 overflow-hidden w-full transition-transform duration-300 transform hover:scale-125"
          href="https://www.linkedin.com/in/damian-peralta-4bb258215"
          target="_blank"
        >
          <Image
            src="/aboutUsImg/iconoDamy.svg"
            width={100}
            height={100}
            alt="icon"
          />
          <p className="hover:underline">Damy</p>
        </a>
        <a
          className="flex flex-col items-center mx-4 overflow-hidden w-full transition-transform duration-300 transform hover:scale-125"
          href="https://www.linkedin.com/in/cristian-gabriel-araya-salattino"
          target="_blank"
        >
          <Image
            src="/aboutUsImg/iconoGaby.svg"
            width={100}
            height={100}
            alt="icon"
          />
          <p className="hover:underline">Gaby</p>
        </a>
        <a
          className="flex flex-col items-center mx-4 overflow-hidden w-full transition-transform duration-300 transform hover:scale-125"
          href="https://www.linkedin.com/in/alejandro-campaya"
          target="_blank"
        >
          <Image
            src="/aboutUsImg/iconoAle.svg"
            width={100}
            height={100}
            alt="icon"
          />
          <p className="hover:underline">Ale</p>
        </a>
        <a
          className="flex flex-col items-center mx-4 overflow-hidden w-full transition-transform duration-300 transform hover:scale-125"
          href="https://www.linkedin.com/in/delfinamerlo"
          target="_blank"
        >
          <Image
            src="/aboutUsImg/iconoDelfi.svg"
            width={100}
            height={100}
            alt="icon"
          />
          <p className="hover:underline">Delfi</p>
        </a>
        <a
          className="flex flex-col items-center mx-4 overflow-hidden w-full transition-transform duration-300 transform hover:scale-125"
          href="https://www.linkedin.com/in/keilaygonzalez"
          target="_blank"
        >
          <Image
            src="/aboutUsImg/iconoYese.svg"
            width={100}
            height={100}
            alt="icon"
          />
          <p className="hover:underline">Yese</p>
        </a>
        <a
          className="flex flex-col items-center mx-4 overflow-hidden w-full transition-transform duration-300 transform hover:scale-125"
          href="https://www.linkedin.com/in/samanta-driuzzi"
          target="_blank"
        >
          <Image
            src="/aboutUsImg/iconoSamy.svg"
            width={100}
            height={100}
            alt="icon"
          />
          <p className="hover:underline">Samy</p>
        </a>
      </div>
    </div>
  );
};
export default AboutUs;
