import Image from "next/image";
import Link from "next/link";

const DonationFailed = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-color11 h-screen pt-10 text-2xl text-black ">
            <h2 className="text-5xl">Transacción fallida</h2>
            <Image className="p-5" src="/donations/fallida.svg" alt="gato triste" height={250} width={250} />
            <h3>Gracias por querer apoyarnos!</h3>
            <div className="mt-10">
                <Link href="/donations" className="flex text-yellow-400 mb-3 justify-center items-center">Inténtalo nuevamente</Link>
            </div>
        </div>
    )
}
export default DonationFailed;