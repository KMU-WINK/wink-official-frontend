interface TitleProps {
  title: string;
  subTitle: string;
}

export default function Title({ title, subTitle }: TitleProps) {
  return (
    <div className="flex flex-col items-center space-y-0.5">
      <h1 className="text-2xl sm:text-4xl">{title}</h1>
      <p className="text-3xl sm:text-5xl font-semibold">{subTitle}</p>
    </div>
  );
}
