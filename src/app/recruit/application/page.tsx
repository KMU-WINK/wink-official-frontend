'use client';

import { SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Form } from '@/ui/form';
import { Progress } from '@/ui/progress';

import Api from '@/api';
import { ApplicationRequest, ApplicationRequestSchema } from '@/api/type/domain/recruit';
import Recruit from '@/api/type/schema/recruit';

import Step0 from '@/app/recruit/application/_step/0';
import Step1 from '@/app/recruit/application/_step/1';
import Step2 from '@/app/recruit/application/_step/2';
import Step3 from '@/app/recruit/application/_step/3';
import Step4 from '@/app/recruit/application/_step/4';
import Step5 from '@/app/recruit/application/_step/5';
import Step6 from '@/app/recruit/application/_step/6';
import Step7 from '@/app/recruit/application/_step/7';
import Step8 from '@/app/recruit/application/_step/8';
import Step9 from '@/app/recruit/application/_step/9';
import Step10 from '@/app/recruit/application/_step/10';
import Step11 from '@/app/recruit/application/_step/11';
import Step12 from '@/app/recruit/application/_step/12';
import Step13 from '@/app/recruit/application/_step/13';
import Step14 from '@/app/recruit/application/_step/13';
import Step15 from '@/app/recruit/application/_step/14';
import Step16 from '@/app/recruit/application/_step/15';
import Step17 from '@/app/recruit/application/_step/16';
import { Step, StepProps, toDate } from '@/lib/util';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useAnimationControls } from 'framer-motion';
import { CircleChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

export interface RecruitStepProps extends StepProps<ApplicationRequest> {
  recruit: Recruit;
}

const STEPS: Step<RecruitStepProps> = [
  Step0,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  Step7,
  Step8,
  Step9,
  Step10,
  Step11,
  Step12,
  Step13,
  Step14,
  Step15,
  Step16,
  Step17,
];

export default function RecruitApplicationPage() {
  const router = useRouter();
  const controls = useAnimationControls();

  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(7);
  const [recruit, setRecruit] = useState<Recruit | null>(null);

  const form = useForm<ApplicationRequest>({
    resolver: zodResolver(ApplicationRequestSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      studentId: '',
      email: '',
      phoneNumber: '',
      jiwonDonggi: '',
      baeugoSipeunJeom: '',
      canInterviewDates: [],
      domains: [],
      github: '',
      frontendTechStacks: [],
      backendTechStacks: [],
      devOpsTechStacks: [],
      designTechStacks: [],
      favoriteProject: '',
      lastComment: '',
    },
  });

  const go = useCallback(
    async (page: SetStateAction<number>) => {
      form.clearErrors();
      setIsProcessing(true);

      setTimeout(() => {
        setStep(page);
        setIsProcessing(false);
      }, 750);

      await controls.start({
        opacity: 0,
        transition: {
          ease: 'easeInOut',
          duration: 0.5,
        },
      });

      await controls.start({
        opacity: 1,
        transition: {
          delay: 0.5,
          ease: 'easeInOut',
          duration: 0.5,
        },
      });
    },
    [controls, setStep],
  );

  const StepComponent = useMemo(() => {
    const Component = STEPS[step];
    return (
      <motion.div animate={controls} className="flex flex-col items-center space-y-6 w-full">
        <Component go={go} recruit={recruit!} form={form} />
      </motion.div>
    );
  }, [step, recruit]);

  useEffect(() => {
    (async () => {
      const { recruit } = await Api.Domain.Recruit.getLatestRecruit();

      if (
        !recruit ||
        toDate(recruit.recruitStartDateTime) > new Date() ||
        toDate(recruit.recruitEndDateTime) < new Date()
      ) {
        toast.error('잘못된 접근입니다.');
        router.replace('/');
        return;
      }

      setRecruit(recruit);
      setLoading(false);
    })();
  }, []);

  useEffect(form.clearErrors, [step]);

  if (loading || !recruit) return null;

  return (
    <div className="flex flex-col items-center px-6 pt-20 sm:pt-28 pb-10 space-y-10">
      {step > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.5,
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
          {StepComponent}
        </form>
      </Form>
    </div>
  );
}
