export interface Info {
  title: string;
  content: string;
}

interface InfoCardProps extends Info {}

export default function InfoCard({ title, content }: InfoCardProps) {
  return (
    <div className="flex flex-col w-[300px] min-h-[120px] sm:min-h-[140px] p-4 sm:p-6 border border-neutral-500 rounded-3xl space-y-1 sm:space-y-2 justify-center">
      <h2 className="sm:text-lg font-semibold text-wink-500">{title}</h2>
      <p className="text-sm sm:text-base whitespace-pre-line">{content}</p>
    </div>
  );
}
