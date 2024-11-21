export interface Domain {
  raw: string;
  tag: string;
  domain: string;
  description: string;
}

interface DomainCardProps extends Domain {}

export default function DomainCard({ tag, domain, description }: DomainCardProps) {
  return (
    <div className="flex flex-col w-[300px] min-h-[120px] sm:min-h-[140px] p-4 sm:p-6 border border-neutral-500 rounded-3xl space-y-1 sm:space-y-2 justify-center">
      <h2 className="sm:text-lg font-medium text-wink-500">{tag}</h2>
      <h2 className="sm:text-lg font-semibold">{domain}</h2>
      <p className="text-sm sm:text-base">{description}</p>
    </div>
  );
}
