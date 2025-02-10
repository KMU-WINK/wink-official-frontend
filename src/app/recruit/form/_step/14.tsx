import { useEffect, useState } from 'react';

import { backendTechStacks } from '@/app/recruit/form/_constant/tech_stack';

import { Stack } from '@/app/recruit/form/_component/StackButton';

import { Button } from '@/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ui/command';
import { FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

import { BackendTechStack } from '@/api/type/schema/recruit-form';

import { cn } from '@/util';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';
import { Check, ChevronsUpDown, Server } from 'lucide-react';
import { toast } from 'sonner';

export default function Step14({ go, setStep, form }: RecruitStepProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    const stacks: Stack[] = JSON.parse(localStorage.getItem('recruit:stacks')!);
    const amount = sessionStorage.getItem('recruit:back') === 'true' ? -1 : +1;

    if (!stacks.includes('backend')) {
      setStep((prev) => prev + amount);
    } else {
      sessionStorage.removeItem('recruit:back');
    }
  }, []);

  return (
    <>
      <Server size={64} />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.2,
            duration: 0.4,
          },
        }}
      >
        <p className="font-medium text-lg">다룰 수 있는 백엔드 기술을 알려주세요!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2.2,
            duration: 0.4,
            ease: 'easeInOut',
          },
        }}
        className="flex flex-col w-full max-w-[300px]"
      >
        <FormField
          control={form.control}
          name="backendTechStacks"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                      {field.value!.length > 0
                        ? BackendTechStack[
                            field.value![0] as unknown as keyof typeof BackendTechStack
                          ] + (field.value!.length > 1 ? ` (외 ${field.value!.length - 1}개)` : '')
                        : '백엔드 기술을 선택해주세요.'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="백엔드 기술 검색" />
                      <CommandList>
                        <CommandEmpty>검색된 기술이 없습니다.</CommandEmpty>

                        {Object.entries(backendTechStacks).map(([group, stacks]) => (
                          <CommandGroup key={group} heading={group}>
                            {stacks
                              .map((stack) => stack as BackendTechStack)
                              .map((stack) => {
                                const raw = Object.entries(BackendTechStack).find(
                                  ([, name]) => name === stack,
                                )![0] as BackendTechStack;

                                return (
                                  <CommandItem
                                    key={stack}
                                    value={raw}
                                    onSelect={(value) =>
                                      field.onChange(
                                        field.value!.includes(raw)
                                          ? field.value!.filter((s) => s !== value)
                                          : [...field.value!, value],
                                      )
                                    }
                                  >
                                    {stack}
                                    <Check
                                      className={cn(
                                        'ml-auto',
                                        field.value!.includes(raw) ? 'opacity-100' : 'opacity-0',
                                      )}
                                    />
                                  </CommandItem>
                                );
                              })}
                          </CommandGroup>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 3.1,
            duration: 0.4,
            ease: 'easeInOut',
          },
        }}
        className="flex items-center space-x-4"
      >
        <Button
          variant="outline"
          disabled={clicked}
          onClick={() => {
            setClicked(true);

            form.setValue('backendTechStacks', []);

            go((prev) => prev + 1);
          }}
        >
          건너뛰기
        </Button>

        <Button
          variant="wink"
          disabled={clicked}
          onClick={async () => {
            setClicked(true);

            if (await form.trigger('backendTechStacks')) {
              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.backendTechStacks!.message);
              setClicked(false);
            }
          }}
        >
          다음으로
        </Button>
      </motion.div>
    </>
  );
}
