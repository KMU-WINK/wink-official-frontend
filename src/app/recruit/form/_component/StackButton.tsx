import { Dispatch, SetStateAction } from 'react';

import { Button } from '@/ui/button';

export type Stack = 'frontend' | 'backend' | 'devops' | 'design';

interface StackButtonProps {
  name: string;
  raw: Stack;
  stacks: Stack[];
  setStacks: Dispatch<SetStateAction<Stack[]>>;
}

export default function StackButton({ name, raw, stacks, setStacks }: StackButtonProps) {
  return (
    <Button
      variant={stacks.includes(raw) ? 'default' : 'outline'}
      onClick={() =>
        setStacks((prev) =>
          prev.includes(raw) ? prev.filter((stack) => stack !== raw) : [...prev, raw],
        )
      }
    >
      {name}
    </Button>
  );
}
