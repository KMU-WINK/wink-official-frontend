'use client';

import {
  ComponentType,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';

import { Form } from '@/ui/form';
import { Progress } from '@/ui/progress';

import { MigrateRequest, MigrateRequestSchema } from '@/api/domain/migrate';

import Step0 from '@/app/migrate/_step/0';
import Step1 from '@/app/migrate/_step/1';
import Step2 from '@/app/migrate/_step/2';
import Step3 from '@/app/migrate/_step/3';
import Step4 from '@/app/migrate/_step/4';
import Step5 from '@/app/migrate/_step/5';
import Step6 from '@/app/migrate/_step/6';
import Step7 from '@/app/migrate/_step/7';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useAnimationControls } from 'framer-motion';
import { CircleChevronLeft } from 'lucide-react';

export interface MigrateStepProps {
  go: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<MigrateRequest>;
}

const STEPS: ComponentType<MigrateStepProps>[] = [
  Step0,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  Step7,
];

export default function MigratePage() {
  const controls = useAnimationControls();

  const [isProcessing, setisProcessing] = useState(false);
  const [step, setStep] = useState(0);

  const form = useForm<MigrateRequest>({
    resolver: zodResolver(MigrateRequestSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      studentId: '',
      department: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
  });

  const go = useCallback(
    async (page: SetStateAction<number>) => {
      setisProcessing(true);

      setTimeout(() => {
        setStep(page);
        setisProcessing(false);
      }, 400);

      await controls.start({
        opacity: 0,
        transition: {
          ease: 'easeInOut',
          duration: 0.4,
        },
      });

      await controls.start({
        opacity: 1,
        transition: {
          delay: 0.4,
          ease: 'easeInOut',
          duration: 0.4,
        },
      });
    },
    [controls, setStep],
  );

  const StepComponent = useMemo(() => STEPS[step], [step]);

  useEffect(form.clearErrors, [step]);

  return (
    <>
      {step > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.4,
              ease: 'easeInOut',
            },
          }}
          className="flex items-center space-x-4 w-[300px]"
        >
          <CircleChevronLeft
            className="cursor-pointer aria-disabled:opacity-50"
            aria-disabled={isProcessing}
            onClick={() => !isProcessing && go((prev) => prev - 1)}
          />
          <Progress value={(step / (STEPS.length - 1)) * 100} className="h-2" />
        </motion.div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="w-full">
          <motion.div animate={controls} className="flex flex-col items-center space-y-6 w-full">
            <StepComponent go={go} form={form} />
          </motion.div>
        </form>
      </Form>
    </>
  );
}
