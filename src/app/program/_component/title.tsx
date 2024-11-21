interface TitleProps {
  title: string;
  subtitle: string;
}

export default function Title({ title, subtitle }: TitleProps) {
  return (
    <div className="flex flex-col items-center space-y-0.5 sm:space-y-2">
      <p className="text-2xl sm:text-4xl font-bold">{title}</p>
      <p className="text-sm sm:text-base text-neutral-600">{subtitle}</p>
    </div>
  );
}
