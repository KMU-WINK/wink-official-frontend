import { useState } from 'react';
import { IconMGraduationCap } from 'react-fluentui-emoji/lib/modern';

import { departments } from '@/app/recruit/form/_constant/departments';

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

import { useRecruitStore } from '@/store/recruit';

import { cn } from '@/util';

import { RecruitStepProps } from '@/app/recruit/form/page';

import { motion } from 'framer-motion';
import { Check, ChevronsUpDown } from 'lucide-react';
import { toast } from 'sonner';

export default function Step3({ go, form }: RecruitStepProps) {
  const [clicked, setClicked] = useState(false);

  const { step, modify, setModify } = useRecruitStore();

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="size-[48px] sm:size-[72px]">
        <IconMGraduationCap size="auto" />
      </div>

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
        <p className="font-medium text-lg">어느 학부(과)에서 공부하고 계신가요?</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{
          opacity: 1,
          pointerEvents: 'auto',
          transition: {
            delay: 2.2,
            duration: 0.4,
            ease: 'easeInOut',
          },
        }}
        className="w-full max-w-[300px]"
      >
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {field.value || '학부(과)를 선택해주세요.'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="학부(과) 검색" />
                      <CommandList>
                        <CommandEmpty>검색된 학과가 없습니다.</CommandEmpty>

                        {Object.entries(departments).map(([college, _departments]) => (
                          <CommandGroup heading={college}>
                            {_departments.map((department) => (
                              <CommandItem
                                key={department}
                                value={college + ' ' + department}
                                onSelect={(value) => {
                                  field.onChange(value);
                                  setOpen(false);
                                }}
                              >
                                {department}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    field.value === college + ' ' + department
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            ))}
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
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{
          opacity: 1,
          pointerEvents: 'auto',
          transition: {
            delay: 3.1,
            duration: 0.4,
            ease: 'easeInOut',
          },
        }}
      >
        <Button
          variant="wink"
          disabled={clicked}
          onClick={async () => {
            setClicked(true);

            if (await form.trigger('department')) {
              go(modify || step + 1);
              modify && setTimeout(() => setModify(undefined), 400);
            } else {
              toast.error(form.formState.errors.department!.message);
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
