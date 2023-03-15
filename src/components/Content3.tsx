import Image, { StaticImageData } from "next/image";

interface ContentProps {
  subject: string | null;
  title: string;
  text: string;
  reverse: boolean;
  imageSrc: StaticImageData;
  imageAlt: string;
}

const Content3 = ({
  subject,
  title,
  text,
  reverse,
  imageSrc,
  imageAlt,
}: ContentProps) => {
  return (
    <div
      className={`flex flex-col-reverse md:flex-row md:justify-center gap-2 md:gap-[80px] ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex flex-col w-full md:w-[400px]">
        {subject !== null ? (
          <h2 className="font-pretendard text-[#3a70ff] text-2xl md:text-3xl font-medium mt-3 md:mt-6">{subject}</h2>
        ) : null}
        <h1
          className={`font-pretendard text-xl md:text-4xl py-1 font-medium ${
            subject === null ? "md:py-3" : "md:py-2"
          }`}
        >
          {title.split("\n").map((txt, index) => (
            <p key={index}>
              {txt}
              <br />
            </p>
          ))}
        </h1>
        <h3
          className={`font-pretendard text-lg md:text-xl py-2 md:py-5 ${
            subject === null ? "" : "text-[#6b7684]"
          }`}
        >
          {text.split("\n").map((txt, index) => (
            <p key={index}>
              {txt}
              <br />
            </p>
          ))}
        </h3>
      </div>
      <Image
        className="rounded-3xl w-full md:w-[400px]"
        src={imageSrc}
        alt={imageAlt}
      />
    </div>
  );
};

export default Content3;
