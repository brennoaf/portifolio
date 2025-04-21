import Image from "next/image";

interface ProfilePictureProps {
  size: number;
}

export default function ProfilePicture({ size }: ProfilePictureProps) {
  const pictureSize = (1 << size) - 24;

  return (
    <div
      style={{ width: pictureSize, height: pictureSize }}
      className="flex relative justify-center items-center pointer-events-none select-none"
    >
      <Image
        src="/images/frames/frame-test.png"
        fill
        alt="Moldura da foto"
        className="z-10 absolute pointer-events-none"
        unoptimized
        style={{ objectFit: "contain" }}
      />
      <div
        className="absolute z-0"
        style={{
          width: pictureSize - pictureSize * 0.32,
          height: pictureSize - pictureSize * 0.32,
        }}
      >
        <Image
          src="/images/profile/brenno1.jpg"
          alt="Minha foto de perfil"
          fill
          unoptimized
          style={{ objectFit: "cover", borderRadius: 4 }}
        />
      </div>
    </div>
  );
}
