import MaskImage from '@/public/recruit/mask.jpg';

interface RecruitTitleProps {
  year: number;
}

export default function RecruitTitle({ year }: RecruitTitleProps) {
  return (
    <>
      <h1 className="absolute top-1/2 left-1/2 -translate-x-[calc(50%+3px)] sm:-translate-x-[calc(50%+6px)] -translate-y-[calc(50%+3px)] sm:-translate-y-[calc(50%+6px)] text-5xl sm:text-8xl text-center font-roboto font-black italic text-transparent uppercase z-20 [-webkit-text-stroke:1px_white] sm:[-webkit-text-stroke:2px_white]">
        {year} WINK RECRUITMENT
      </h1>
      <h1
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-8xl text-center font-roboto font-black italic text-transparent uppercase bg-clip-text bg-cover bg-right bg-no-repeat z-10"
        style={{ backgroundImage: `url(${MaskImage.src})` }}
      >
        {year} WINK RECRUITMENT
      </h1>
    </>
  );
}
