import Image from "next/image";

export default function ProfilePicture() {
  const pictureSize = (1 << 7) - 24;

  return (
    <div style={{ width: pictureSize, height: pictureSize }} className="flex relative justify-center items-center pointer-events-none select-none">
        <Image
        src="/images/frames/frame-test.png"
        fill
        alt="Moldura da foto"
        className="z-10 absolute pointer-events-none"
        style={{ objectFit: "contain" }}
        />
        <div
        className="absolute z-0"
        style={{
            width: pictureSize - ( pictureSize * 32 / 100 ),
            height: pictureSize - ( pictureSize * 32 / 100 ),
        }}
        >
            <Image
                src="/images/profile/brenno1.jpg"
                alt="Minha foto de perfil"
                fill
                style={{ objectFit: "cover", borderRadius: 4 }}
            />
        </div>
    </div>
  );
}
