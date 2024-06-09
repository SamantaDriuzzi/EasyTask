import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/logo.svg" alt="logo" width={100} height={100} />
      <div className="text-3xl mt-[-32px]">EasyTasks</div>
    </div>
  );
};
export default Logo;
