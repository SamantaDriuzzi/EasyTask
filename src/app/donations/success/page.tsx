import Image from "next/image";
import Link from "next/link";

const DonationSuccessful = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-color9 h-screen pt-10 text-2xl text-white">
            <h2 className="text-5xl pt-8">Transacción exitosa</h2>
            <Image className="p-5 m-1 animate-scalePulse" src="/donations/exitosa.svg" alt="gato amoroso" height={200} width={200} />
            <h3>Eres un héroe!</h3>
            <h3>Gracias a personas como tú esta app es posible</h3>
            <h3>Continuemos ayudándonos en esta hermosa comunidad</h3>
            <h3>Gracias por tu apoyo!</h3>
            <h3>Continuaremos mejorando</h3>
            <Link className="rounded-md py-1 px-3 border border-white hover:bg-color5 text-xl mt-10" href="/donations">Volver</Link>
        </div>
    )

}
export default DonationSuccessful;