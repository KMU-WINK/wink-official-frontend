import { useEffect, useState } from 'react';

import { frontendTechStacks } from '@/app/recruit/form/_constant/tech_stack';

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

import { FrontendTechStack } from '@/api/type/schema/recruit-form';

import { cn } from '@/util';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';
import { Check, ChevronsUpDown, Palette } from 'lucide-react';
import { toast } from 'sonner';

export default function Step13({ go, setStep, form }: RecruitStepProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    const stacks: Stack[] = JSON.parse(localStorage.getItem('recruit:stacks')!);
    const amount = sessionStorage.getItem('recruit:back') === 'true' ? -1 : +1;

    sessionStorage.removeItem('recruit:back');

    if (!stacks.includes('frontend')) {
      setStep((prev) => prev + amount);
    }
  }, []);

  return (
    <>
      <Palette size={64} />

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
        <p className="font-medium text-lg">다룰 수 있는 프론트엔드 기술을 알려주세요!</p>
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
          name="frontendTechStacks"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                      {field.value!.length > 0
                        ? FrontendTechStack[
                            field.value![0] as unknown as keyof typeof FrontendTechStack
                          ] + (field.value!.length > 1 ? ` (외 ${field.value!.length - 1}개)` : '')
                        : '프론트엔드 기술을 선택해주세요.'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="프론트엔드 기술 검색" />
                      <CommandList>
                        <CommandEmpty>검색된 기술이 없습니다.</CommandEmpty>

                        {Object.entries(frontendTechStacks).map(([group, stacks]) => (
                          <CommandGroup key={group} heading={group}>
                            {stacks
                              .map((stack) => stack as FrontendTechStack)
                              .map((stack) => {
                                const raw = Object.entries(FrontendTechStack).find(
                                  ([, name]) => name === stack,
                                )![0] as FrontendTechStack;

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

            form.setValue('frontendTechStacks', []);

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

            if (await form.trigger('frontendTechStacks')) {
              go((prev) => prev + 1);
            } else {
              toast.error(form.formState.errors.frontendTechStacks!.message);
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
