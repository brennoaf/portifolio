import Image from "next/image";
import { useRef } from "react";
import ProfilePicture from "./ProfilePicture";
import ButtonHover from "./ButtonHover";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleLogin = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/startup.mp3");
      audioRef.current.volume = 1;
    }
    audioRef.current.play();
    onLogin();
  };

  return (
    <div className="w-screen h-screen bg-[url(/images/wallpapers/login.webp)] bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center text-white font-mono">
      <div className="flex flex-col w-[250px] justify-center items-center">
        <ProfilePicture size={8} />
        <p className="login-username mb-3 text-2xl">Brenno França</p>
        <div className="relative flex flex-row w-full gap-2 items-center justify-center">
          <input type="password" placeholder="Senha" className="text-black w-full rounded-lg px-2 py-1" />

          <ButtonHover
            defaultSrc="/images/icons/login/login_arrow/default.png"
            hoverSrc="/images/icons/login/login_arrow/hover.png"
            alt="Login"
            width={32}
            height={32}
            onClick={handleLogin}
            className="absolute -right-11"
        />
        </div>
      </div>
      <ButtonHover
            defaultSrc="/images/icons/login/shutdown/default.png"
            hoverSrc="/images/icons/login/shutdown/hover.png"
            alt="Desligar"
            width={48}
            height={32}
            className="absolute bottom-10 right-10"
        />
    <ButtonHover
        defaultSrc="/images/icons/login/access/default.png"
        hoverSrc="/images/icons/login/access/hover.png"
        alt="Acessibilidade"
        width={29}
        height={29}
        className="absolute bottom-10 left-10"
    />
    <div className="absolute bottom-10">
        <div className="relative w-[150px] h-[38px]">
            <div className="overflow-hidden absolute translate-x-[-120px] translate-y-[2px]">
                <Image
                    src="/text-logo.png"
                    width={150}
                    height={32}
                    unoptimized
                    alt="Windows 7 Logo"
                    className="translate-x-[95px] scale-[65%]"
                />
            </div>
            <div className="overflow-hidden absolute top-0 -right-[45px] invert scale-110">
                <Image
                    src="/text-logo.png"
                    width={150}
                    height={32}
                    unoptimized
                    alt="Windows 7 Logo"
                    className="translate-x-[-45px]"
                />
            </div>

        </div>
    </div>
    </div>
  );
}
