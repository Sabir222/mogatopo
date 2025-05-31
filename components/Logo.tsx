"use client";
import Image from "next/image";
import { useRouter } from "navigation";
type LogoProps = {};

const Logo: React.FC<LogoProps> = ({ }) => {
  const router = useRouter();
  return (
    <Image
      className="cursor-pointer"
      src="/mogatopo/logo2.png"
      height={60}
      width={60}
      alt="logo"
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
