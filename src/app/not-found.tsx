import Image from "next/image";
import Link from "next/link";

const PageNotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen p-10 bg-darkgrey text-white ">
            <Image className="ml-10 mt-10 pt-10" src="/404.svg" alt="gato perdido" height={400} width={400} />
            <h2 className="text-red-600 text-2xl mt-7">ERROR</h2>
            <h1 className="text-6xl mb-7">Not Found</h1>
            <Link href="/home" className="border border-white p-1 rounded-md hover:bg-color5 mt-10 px-7">Inicio</Link>

        </div>
    )
}
export default PageNotFound;