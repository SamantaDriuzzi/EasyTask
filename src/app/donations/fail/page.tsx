import Image from "next/image";
import Link from "next/link";

const DonationFailed = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-color9 h-screen pt-10 text-2xl text-white ">
            <h2 className="text-5xl">Transacción fallida</h2>
            <Image className="p-5" src="/donations/fallida.svg" alt="gato triste" height={250} width={250} />
            <h3>Gracias por querer apoyarnos!</h3>
            <div className="mt-10">
                <Link href="/donations" className="flex mb-3 justify-center items-center rounded-md py-1 px-3 border border-white hover:bg-color5 text-xl mt-10">Inténtalo nuevamente</Link>
            </div>
        </div>
    )
}
export default DonationFailed;