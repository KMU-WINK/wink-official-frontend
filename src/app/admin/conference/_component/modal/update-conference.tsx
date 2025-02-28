import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button';
import { Calendar } from '@/ui/calendar';
import { DialogHeader } from '@/ui/dialog';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { ScrollArea, ScrollBar } from '@/ui/scroll-area';

import Api from '@/api';
import {
  CreateConferenceRequest,
  CreateConferenceRequestSchema,
} from '@/api/type/domain/conference';
import Conference from '@/api/type/schema/conference';
import { useApiWithToast } from '@/api/useApi';

import { formatDateApiWithTime, formatDateWithTime } from '@/util';

import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar as CalendarIcon } from 'lucide-react';

interface UpdateConferenceModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  conference?: Conference;
  callback: (conference: Conference) => void;
}

export default function UpdateConferenceModal({
  open,
  setOpen,
  conference,
  callback,
}: UpdateConferenceModalProps) {
  const [isApi, startApi] = useApiWithToast();

  const [date, setDate] = useState<Date>();

  const form = useForm<CreateConferenceRequest>({
    resolver: zodResolver(CreateConferenceRequestSchema),
    mode: 'onChange',
    defaultValues: {
      location: '',
      date: '',
    },
  });

  const onSubmit = useCallback(
    (values: CreateConferenceRequest) => {
      if (!conference) return;

      startApi(
        async () => {
          const { conference: _conference } = await Api.Domain.AdminConference.updateConference(
            conference.id,
            values,
          );
          callback(_conference);
        },
        {
          loading: '정기 회의를 수정하고 있습니다',
          success: '정기 회의를 수정했습니다.',
          finally: () => {
            setOpen(false);
            form.reset();
          },
        },
      );
    },
    [conference],
  );

  useEffect(() => {
    if (!conference) return;
    form.reset(conference);
    setDate(new Date(conference.date));
  }, [conference]);

  useEffect(() => {
    if (!date) return;
    form.setValue('date', formatDateApiWithTime(date));
  }, [date]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>정기 회의 수정</DialogTitle>
          <DialogDescription>정기 회의를 수정합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>장소</FormLabel>
                  <FormControl>
                    <Input placeholder="장소를 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>날짜</FormLabel>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className="font-normal">
                          {date ? (
                            formatDateWithTime(date, true)
                          ) : (
                            <span className="text-neutral-500">날짜를 선택해주세요.</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <div className="sm:flex">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) =>
                            date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
                          }
                        />
                        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                          <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex sm:flex-col p-2">
                              {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                <Button
                                  key={hour}
                                  size="icon"
                                  disabled={!date}
                                  variant={date?.getHours() === hour ? 'default' : 'ghost'}
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={() => setDate(new Date(date!.setHours(hour)))}
                                >
                                  {hour}
                                </Button>
                              ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="sm:hidden" />
                          </ScrollArea>
                          <ScrollArea className="w-64 sm:w-auto">
                            <div className="flex sm:flex-col p-2">
                              {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                                <Button
                                  key={minute}
                                  size="icon"
                                  disabled={!date}
                                  variant={date?.getMinutes() === minute ? 'default' : 'ghost'}
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={() => setDate(new Date(date!.setMinutes(minute)))}
                                >
                                  {minute.toString().padStart(2, '0')}
                                </Button>
                              ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="sm:hidden" />
                          </ScrollArea>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="wink" type="submit" disabled={isApi} className="w-full">
              정기 회의 수정
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
