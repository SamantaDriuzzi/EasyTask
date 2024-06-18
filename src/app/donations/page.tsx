"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

const Donations = () => {
    const [amount, setAmount] = useState('');
    const router = useRouter();

    const donation = {
        name: "Easytasks",
        amount: parseFloat(amount) || 0,
    };

    const handlePay = async () => {
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                body: JSON.stringify({
                    amount: donation.amount,
                    name: donation.name,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                const errorDetails = await res.json();
                console.error('Error details:', errorDetails);
                throw new Error('Network response was not ok');
            }

            const session = await res.json();

            if (session.url) {
                router.push(session.url);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    return (
        <>
            <section className="flex flex-col justify-center items-center py-20 h-auto bg-color9 text-white">
                <div className="flex flex-col justify-center items-center w-[60%] pt-10 pb-3">
                    <h2 className="transition-transform duration-300 transform hover:scale-125 my-2">
                        Tu apoyo puede transformar la forma en que trabajas y organizas tus tareas diarias.
                    </h2>
                    <h2 className="transition-transform duration-300 transform hover:scale-125 my-2">
                        Nuestra app gratuita ya facilita tu productividad, pero con tu donación, podemos llevarla al siguiente nivel.
                    </h2>
                    <h2 className="transition-transform duration-300 transform hover:scale-125 my-2">
                        Imagina tener acceso a nuevas funcionalidades que harán tu trabajo aún más eficiente y efectivo.
                    </h2>
                    <h2 className="transition-transform duration-300 transform hover:scale-125 my-2">
                        Cada contribución, por pequeña que sea, nos ayuda a mantener, innovar y mejorar, ofreciendo herramientas avanzadas que se adaptan a tus necesidades.
                    </h2>
                    <h2 className="transition-transform duration-300 transform hover:scale-125 my-2">
                        ¡Sé parte de esta evolución y ayúdanos a construir una experiencia de usuario incomparable!
                    </h2>
                </div>

                <div className='flex flex-col w-[400px] my-10 border rounded-md border-[white] py-7 px-4'>
                    <div className='flex flex-col items-center'>
                        <Image src="/donations/donarGato.svg" alt="gato donante" width="200" height="200" className="animate-scalePulse" />
                        <h2 className='mt-5'>Ingrese el monto que quiere donar (USD):</h2>
                    </div>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="1"
                        placeholder="5"
                        className="mb-4 p-2 text-[black]"
                    />

                    <button onClick={handlePay} className="bg-red-500 p-2 text-white rounded hover:bg-red-600">¡DONA AQUÍ!</button>
                </div>
                  <div className=' flex flex-col items-center mt-10 my-5 py-2 bg-yellow-50 w-full text-black'>
                        <h2>AL llegar al monto del objetivo se desbloqueará una nueva funcionalidad para todos!</h2>
                        <h2>Sumemos nuestros aportes!</h2>
                    </div>
                    <div className="flex justify-center items-start text-3xl w-2/4 mt-8 transition-transform duration-300 transform hover:scale-125 ">
                        <Image className="flex" src="/donations/objetivo.svg" alt="objetivo" height={60} width={60} />
                        <div className="flex flex-col">
                            <h2 className="pt-2 pb-7">PRÓXIMOS OBJETIVOS:</h2>
                            <ul className="text-2xl">
                                <li className="flex justify-between">
                                    <p>Votación de tareas</p>
                                    <div className="flex">
                                        <Image className="flex justify-between mx-5" src="/donations/corazon.svg" alt="corazon" height={20} width={20} />
                                        <p>300 USD</p>
                                    </div>
                                </li>
                                <li className="flex justify-between">
                                    <p>App traducida al inglés</p>
                                    <div className="flex">
                                        <Image className="flex justify-evenly mx-5" src="/donations/corazon.svg" alt="corazon" height={20} width={20} />
                                        <p>500 USD</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                  
            
            </section>
        </>
    );
};

export default Donations;
