export interface Title {
  title: string;
  description?: string;
}

export default function TitleComponent({ title, description }: Title) {
  return (
    <div className="flex flex-col items-center justify-center sm:space-y-1.5">
      <h2 className="text-xl sm:text-4xl font-semibold">{title}</h2>
      {description && <p className="text-xs sm:text-base text-neutral-600">{description}</p>}
    </div>
  );
}
