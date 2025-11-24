import Image from "next/image";
import logo from "@/public/logos/nRoot-Logo.png";

export default function HomeLanding() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full gap-12 text-center md:text-left">
      
      {/* Left text */}
      <div className="flex flex-col gap-4 text-lg text-gray-800 md:text-right">
        {/* <p>Innovate with Purpose</p> */}
        <p>Unicorns of Intangibles</p>
        {/* <p>Shape the Future</p> */}
      </div>

      {/* Logo */}
      <div className="flex justify-center">
        <Image
          src={logo}
          alt="nRoot Technologies Logo"
          width={800}
          height={800}
          className="h-[50vh] w-auto md:h-[70vh]"
          priority
        />
      </div>

      {/* Right text */}
      <div className="flex flex-col gap-4 text-lg text-gray-800">
        {/* <p>Discover Innovation</p> */}
        <p>Innovators by Instinct</p>
        {/* <p>Join Our Journey</p> */}
      </div>

    </div>
  );
}
