interface TitleProps {
  title: string;
  subTitle?: string;
}

export default function Title({ title, subTitle }: TitleProps) {
  return (
    <div className="flex flex-col space-y-1">
      <h1 className="text-lg sm:text-2xl text-center font-light">{title}</h1>
      <h2 className="sm:text-lg text-center text-neutral-500 font-extralight">{subTitle}</h2>
    </div>
  );
}
