import { useEffect, useState } from 'react';

import Image from 'next/image';

import { designTechStacks } from '@/app/recruit/form/_constant/tech_stack';

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

import { DesignTechStack } from '@/api/type/schema/recruit-form';

import { useRecruitStore } from '@/store/recruit';

import { cn } from '@/util';

import Design from '@/public/recruit/icon/design.png';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';
import { Check, ChevronsUpDown } from 'lucide-react';
import { toast } from 'sonner';

export default function Step16({ go, form }: RecruitStepProps) {
  const { step, setStep, modify, setModify, stack, back, setBack } = useRecruitStore();

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    !stack.includes('design') ? setStep(step + (back ? -1 : +1)) : setBack(false);
  }, []);

  return (
    <>
      <Image
        src={Design}
        width={72}
        height={72}
        quality={100}
        placeholder="blur"
        className="w-[48px] h-[48px] sm:w-[72px] sm:h-[72px]"
        alt="icon"
      />

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
        <p className="font-medium text-lg">다룰 수 있는 디자인 기술을 알려주세요!</p>
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
          name="designTechStacks"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                      {field.value!.length > 0
                        ? DesignTechStack[
                            field.value![0] as unknown as keyof typeof DesignTechStack
                          ] + (field.value!.length > 1 ? ` (외 ${field.value!.length - 1}개)` : '')
                        : '디자인 기술을 선택해주세요.'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="디자인 기술 검색" />
                      <CommandList>
                        <CommandEmpty>검색된 기술이 없습니다.</CommandEmpty>

                        {Object.entries(designTechStacks).map(([group, stacks]) => (
                          <CommandGroup key={group} heading={group}>
                            {stacks
                              .map((stack) => stack as DesignTechStack)
                              .map((stack) => {
                                const raw = Object.entries(DesignTechStack).find(
                                  ([, name]) => name === stack,
                                )![0] as DesignTechStack;

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
        {!modify && (
          <Button
            variant="outline"
            disabled={clicked}
            onClick={() => {
              setClicked(true);
              form.setValue('designTechStacks', []);
              go(step + 1);
            }}
          >
            건너뛰기
          </Button>
        )}

        <Button
          variant="wink"
          disabled={clicked}
          onClick={async () => {
            setClicked(true);

            if (await form.trigger('designTechStacks')) {
              go(modify || step + 1);
              modify && setTimeout(() => setModify(undefined), 400);
            } else {
              toast.error(form.formState.errors.designTechStacks!.message);
              setClicked(false);
            }
          }}
        >
          {modify ? '수정 완료' : '다음으로'}
        </Button>
      </motion.div>
    </>
  );
}
