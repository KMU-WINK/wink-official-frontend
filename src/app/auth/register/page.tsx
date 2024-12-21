'use client';

import { SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { Form } from '@/ui/form';
import { Progress } from '@/ui/progress';

import Api from '@/api';
import { RegisterRequest, RegisterRequestSchema } from '@/api/type/domain/auth';
import PreUser from '@/api/type/schema/pre-user';

import { Step, StepProps } from '@/util';

import Step0 from '@/app/auth/register/_step/0';
import Step1 from '@/app/auth/register/_step/1';
import Step2 from '@/app/auth/register/_step/2';
import Step3 from '@/app/auth/register/_step/3';
import Step4 from '@/app/auth/register/_step/4';
import Step5 from '@/app/auth/register/_step/5';
import Step6 from '@/app/auth/register/_step/6';
import Step7 from '@/app/auth/register/_step/7';
import Step8 from '@/app/auth/register/_step/8';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useAnimationControls } from 'framer-motion';
import { CircleChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

export interface RegisterStepProps extends StepProps<RegisterRequest> {
  user: PreUser;
}

const STEPS: Step<RegisterStepProps> = [
  Step0,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  Step7,
  Step8,
];

export default function AuthRegisterPage() {
  const router = useRouter();
  const controls = useAnimationControls();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(0);
  const [user, setUser] = useState<PreUser | null>(null);

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterRequestSchema),
    mode: 'onChange',
    defaultValues: {
      token: '',
      password: '',
      description: '',
      github: '',
      instagram: '',
      blog: '',
    },
  });

  const go = useCallback(
    async (page: SetStateAction<number>) => {
      form.clearErrors();
      setIsProcessing(true);

      setTimeout(() => {
        setStep(page);
        setIsProcessing(false);
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

  const StepComponent = useMemo(() => {
    const Component = STEPS[step];
    return (
      <motion.div animate={controls} className="flex flex-col items-center space-y-6 w-full">
        <Component go={go} user={user!} form={form} />
      </motion.div>
    );
  }, [step, user]);

  useEffect(() => {
    form.setValue('token', token || '');
  }, [token]);

  useEffect(() => {
    (async () => {
      const { isValid, user } = await Api.Domain.Auth.checkRegister({
        token: token ?? 'invalid',
      });

      if (!isValid) {
        toast.error('잘못된 접근입니다.');
        router.replace('/');
        return;
      }

      setUser(user);
      setLoading(false);
    })();
  }, [token]);

  useEffect(form.clearErrors, [step]);

  if (loading) return null;

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

      <div className="w-full pb-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})} className="w-full">
            {StepComponent}
          </form>
        </Form>
      </div>
    </>
  );
}
