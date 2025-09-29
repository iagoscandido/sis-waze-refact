import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src={"/waze-brands-solid-full.svg"}
      width={44}
      height={44}
      alt="Waze Logo"
    ></Image>
  );
}
