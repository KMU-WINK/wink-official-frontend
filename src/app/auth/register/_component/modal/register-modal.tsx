import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Button } from '@/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

import Api from '@/api';
import { RegisterRequest, RegisterRequestSchema } from '@/api/type/domain/auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

interface RegisterModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  token: string | null;
}

export default function RegisterModal({ open, setOpen, token }: RegisterModalProps) {
  const router = useRouter();

  const [isProcessing, setProcessing] = useState<boolean>(false);

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterRequestSchema),
    mode: 'onChange',
    defaultValues: {
      token: token as string,
      password: '',
    },
  });

  const onSubmit = useCallback(async (values: RegisterRequest) => {
    setProcessing(true);

    toast.promise(
      async () => {
        await Api.Domain.Auth.register(values);

        sessionStorage.setItem('register:confetti', 'true');
        router.replace('/auth/login');
      },
      {
        loading: 'WINK 부원으로 가입 중입니다.',
        success: 'WINK 부원 가입에 성공했습니다.',
        finally: () => setProcessing(false),
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

            <Button variant="wink" type="submit" disabled={isProcessing} className="w-full">
              가입하기
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
