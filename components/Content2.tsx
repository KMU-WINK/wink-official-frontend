import Image, { StaticImageData } from "next/image";
import "aos/dist/aos.css";

interface ContentProps {
  title: string;
  imageSrc: StaticImageData;
  imageAlt: string;
}

const Content2 = ({ title, imageSrc, imageAlt }: ContentProps) => {
  return (
    <div className="flex flex-col gap-8 md:gap-12 py-[98px] md:py-[198px]">
      <h1 className="font-pretendard text-black font-medium text-4xl md:text-5xl" data-aos="fade-right">
        {title.split("\n").map((txt, index) => (
          <p key={index}>
            {txt}
            <br />
          </p>
        ))}
      </h1>
      <Image
        className="rounded-3xl shadow-[0px 0px 100px rgba(255, 255, 255, 0.1)]"
        data-aos="zoom-in"
        data-aos-delay="200"
        src={imageSrc}
        alt={imageAlt}
        width={880}
      />
    </div>
  );
};

export default Content2;
