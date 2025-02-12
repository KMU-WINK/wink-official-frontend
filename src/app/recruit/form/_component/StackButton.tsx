import { Button } from '@/ui/button';

import { useRecruitStore } from '@/store/recruit';

export type Stack = 'frontend' | 'backend' | 'devops' | 'design';

interface StackButtonProps {
  name: string;
  raw: Stack;
}

export default function StackButton({ name, raw }: StackButtonProps) {
  const { stack, setStack } = useRecruitStore();

  return (
    <Button
      variant={stack.includes(raw) ? 'default' : 'outline'}
      onClick={() =>
        setStack(stack.includes(raw) ? stack.filter((s) => s !== raw) : [...stack, raw])
      }
    >
      {name}
    </Button>
  );
}
