import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';
import { RegisterRequest, RegisterRequestSchema } from '@/api/type/domain/auth';
import { useApiWithToast } from '@/api/useApi';

import { useRegisterStore } from '@/store/register';

import { zodResolver } from '@hookform/resolvers/zod';

interface RegisterModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  token: string;
}

export default function RegisterModal({ open, setOpen, token }: RegisterModalProps) {
  const router = useRouter();

  const { setConfetti } = useRegisterStore();

  const [isApi, startApi] = useApiWithToast();

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterRequestSchema),
    mode: 'onChange',
    defaultValues: {
      token,
      password: '',
    },
  });

  const onSubmit = useCallback(async (values: RegisterRequest) => {
    startApi(
      async () => {
        await Api.Domain.Auth.register(values);
        setConfetti(true);
        router.replace('/auth/login');
      },
      {
        loading: 'WINK에 가입하고 있습니다.',
        success: 'WINK에 가입되었습니다.',
      },
    );
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>회원가입</DialogTitle>
          <DialogDescription>WINK 부원으로 가입합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="비밀번호를 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="wink" type="submit" disabled={isApi} className="w-full">
              가입하기
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
