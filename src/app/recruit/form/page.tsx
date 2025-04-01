'use client';

import { ComponentType, useCallback, useEffect, useMemo, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Form } from '@/ui/form';
import { Progress } from '@/ui/progress';

import Api from '@/api';
import { RecruitFormRequest, RecruitFormRequestSchema } from '@/api/type/domain/recruit';
import Recruit from '@/api/type/schema/recruit';
import { useApi } from '@/api/useApi';

import { useRecruitStore } from '@/store/recruit';

import { nowDate, toDate } from '@/util';

import Loading from '@/app/loading';
import Step0 from '@/app/recruit/form/_step/0';
import Step1 from '@/app/recruit/form/_step/1';
import Step2 from '@/app/recruit/form/_step/2';
import Step3 from '@/app/recruit/form/_step/3';
import Step4 from '@/app/recruit/form/_step/4';
import Step5 from '@/app/recruit/form/_step/5';
import Step6 from '@/app/recruit/form/_step/6';
import Step7 from '@/app/recruit/form/_step/7';
import Step8 from '@/app/recruit/form/_step/8';
import Step9 from '@/app/recruit/form/_step/9';
import Step10 from '@/app/recruit/form/_step/10';
import Step11 from '@/app/recruit/form/_step/11';
import Step12 from '@/app/recruit/form/_step/12';
import Step13 from '@/app/recruit/form/_step/13';
import Step14 from '@/app/recruit/form/_step/14';
import Step15 from '@/app/recruit/form/_step/15';
import Step16 from '@/app/recruit/form/_step/16';
import Step17 from '@/app/recruit/form/_step/17';
import Step18 from '@/app/recruit/form/_step/18';

import { zodResolver } from '@hookform/resolvers/zod';
import { endOfDay, startOfDay } from 'date-fns';
import { motion, useAnimationControls } from 'framer-motion';
import { CircleChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

export interface RecruitStepProps {
  go: (page: number) => void;
  form: UseFormReturn<RecruitFormRequest>;
  recruit: Recruit;
}

const STEPS: ComponentType<RecruitStepProps>[] = [
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
  Step18,
];

export default function RecruitApplicationPage() {
  const router = useRouter();

  const { step, data, setStep, developer, setBack, modify, setData } = useRecruitStore();

  const [isApi, startApi] = useApi();
  const [isMoving, startMoving] = useApi();

  const controls = useAnimationControls();

  const [recruit, setRecruit] = useState<Recruit>();

  const form = useForm<RecruitFormRequest>({
    resolver: zodResolver(RecruitFormRequestSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      studentId: '',
      department: '',
      email: '',
      phoneNumber: '',
      jiwonDonggi: '',
      selfIntroduce: '',
      outings: [],
      interviewDates: [],
      whyCannotInterview: '',
      github: '',
      frontendTechStacks: [],
      backendTechStacks: [],
      devOpsTechStacks: [],
      designTechStacks: [],
      favoriteProject: '',
    },
  });

  const go = useCallback((page: number) => {
    startMoving(async () => {
      await controls.start({
        opacity: 0,
        transition: {
          ease: 'easeInOut',
          duration: 0.4,
        },
      });

      setStep(page);

      await controls.start({
        opacity: 1,
        transition: {
          delay: 0.4,
          ease: 'easeInOut',
          duration: 0.4,
        },
      });
    });
  }, []);

  const StepComponent = useMemo(() => STEPS[step], [step]);

  useEffect(() => {
    startApi(async () => {
      const { recruit } = await Api.Domain.Recruit.getLatestRecruit();

      if (
        !recruit ||
        nowDate() < startOfDay(toDate(recruit.recruitStartDate)) ||
        nowDate() > endOfDay(toDate(recruit.recruitEndDate))
      ) {
        toast.error('잘못된 접근입니다.');
        router.replace('/');
        return;
      }

      setRecruit(recruit);
    });
  }, []);

  useEffect(() => {
    toast.info(
      data
        ? '이전에 작성하던 내용을 불러왔습니다.'
        : '페이지를 나갔다 와도 내용을 계속 작성할 수 있어요',
    );
  }, []);

  useEffect(() => {
    if (!data) return;
    form.reset(data);
  }, []);

  useEffect(form.clearErrors, [step]);

  useEffect(() => {
    const subscription = form.watch((values) => setData(values as RecruitFormRequest));
    return () => subscription.unsubscribe();
  }, [form.watch]);

  if (isApi || !recruit) return <Loading />;

  return (
    <>
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
          aria-disabled={!!(isMoving || step <= 0 || modify)}
          onClick={() => {
            if (isMoving || step <= 0 || modify) return;

            14 <= step && step <= 17 && setBack(true);

            if (step === 17 && !developer) {
              go(10);
              return;
            }

            go(step - 1);
          }}
        />
        <Progress value={(step / (STEPS.length - 1)) * 100} className="h-2" />
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="w-full">
          <motion.div animate={controls} className="flex flex-col items-center space-y-6 w-full">
            <StepComponent go={go} recruit={recruit} form={form} />
          </motion.div>
        </form>
      </Form>
    </>
  );
}
