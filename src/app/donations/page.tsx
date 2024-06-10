import StripeButton from "@/components/donationsButton/stripeButton";
import Image from "next/image";

const Donations = () => {
    return (
        <>
            <section className="flex flex-col justify-center items-center pt-20 h-screen bg-color9 text-white ">
                {/* <div className="">usuarios donantes</div> */}
                <div className="flex flex-col justify-center items-center w-[60%] pt-10 pb-3">
                    <h2 className="transition-transform duration-300 transform hover:scale-125 my-2">Tu apoyo puede transformar la forma en que trabajas y organizas tus tareas diarias.</h2>
                    <h2 className="transition-transform duration-300 transform hover:scale-125 my-2"> Nuestra app gratuita ya facilita tu productividad, pero con tu donación, podemos llevarla al siguiente nivel.</h2>
                    <h2 className="transition-transform duration-300 transform hover:scale-125 my-2">Imagina tener acceso a nuevas funcionalidades que harán tu trabajo aún más eficiente y efectivo.</h2>
                    <h2 className="transition-transform duration-300 transform hover:scale-125 my-2">Cada contribución, por pequeña que sea, nos ayuda a mantener, innovar y mejorar, ofreciendo herramientas avanzadas que se adaptan a tus necesidades.</h2>
                    <h2 className="transition-transform duration-300 transform hover:scale-125 my-2">¡Sé parte de esta evolución y ayúdanos a construir una experiencia de usuario incomparable!</h2>
                </div>
                <Image src="/donations/donarGato.svg" alt="gato donante" width="200" height="200" className="transition-transform duration-300 transform hover:scale-125"></Image>
                <div className="mt-6 transition-transform duration-300 transform hover:scale-125 bg-yellow-500 text-white font-bold py-2 px-4 rounded animate-pulse hover:bg-yellow-200">
                    <StripeButton />
                </div>
            </section>
        </>
    )
}
export default Donations;