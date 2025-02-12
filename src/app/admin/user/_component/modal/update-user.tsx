import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Switch } from '@/ui/switch';

import Api from '@/api';
import { UpdateRequest, UpdateRequestSchema } from '@/api/type/domain/user';
import User, { Role, getKoreanRole } from '@/api/type/schema/user';
import { useApiWithToast } from '@/api/useApi';

import { cn } from '@/util';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';

interface UpdateUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user?: User;
  callback: (user: User) => void;
}

export default function UpdateUserModal({ open, setOpen, user, callback }: UpdateUserModalProps) {
  const [isApi, startApi] = useApiWithToast();

  const [departmentOpen, setDepartmentOpen] = useState(false);

  const form = useForm<UpdateRequest>({
    resolver: zodResolver(UpdateRequestSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      studentId: '',
      department: '',
      email: '',
      phoneNumber: '',
      role: Role.MEMBER,
      fee: false,
    },
  });

  const onSubmit = useCallback(
    (values: UpdateRequest) => {
      startApi(
        async () => {
          const { user: _user } = await Api.Domain.AdminUser.update(user!.id, values);
          callback(_user);
        },
        {
          loading: '유저를 수정하고 있습니다.',
          success: '유저를 수정했습니다',
          finally: () => setOpen(false),
        },
      );
    },
    [user],
  );

  useEffect(() => {
    if (!user) return;
    form.reset(user);
  }, [user]);

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>유저 수정</DialogTitle>
          <DialogDescription>유저를 수정합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="이름을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>학번</FormLabel>
                  <FormControl>
                    <Input placeholder="학번을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>학부(과)</FormLabel>
                  <FormControl>
                    <Popover open={departmentOpen} onOpenChange={setDepartmentOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={departmentOpen}
                          className={cn(
                            'w-full justify-between font-normal',
                            field.value ? '' : 'text-neutral-500',
                          )}
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
                                      setDepartmentOpen(false);
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

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="이메일을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>전화번호</FormLabel>
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      placeholder="전화번호를 입력해주세요."
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
                          .replace(/(-{1,2})$/g, '');

                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>권한</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Role).map((role) => (
                          <SelectItem key={role} value={role}>
                            {getKoreanRole(role)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fee"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <FormLabel>회비 납부</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="wink" type="submit" disabled={isApi} className="w-full">
              유저 수정
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
