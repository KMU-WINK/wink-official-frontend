export interface Title {
  title: string;
  description?: string;
}

interface TitleProps extends Title {}

export default function Title({ title, description }: TitleProps) {
  return (
    <div className="flex flex-col items-center justify-center sm:space-y-1.5">
      <h2 className="text-2xl sm:text-4xl font-semibold">{title}</h2>
      {description && <p className="text-sm sm:text-base text-neutral-600">{description}</p>}
    </div>
  );
}
