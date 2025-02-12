'use client';

import { useCallback, useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';

import Image from 'next/image';

import Title from '@/app/program/_component/title';
import CreateHistoryModal from '@/app/program/history/_component/modal/create-history';
import DeleteHistoryModal from '@/app/program/history/_component/modal/delete-history';
import UpdateHistoryModal from '@/app/program/history/_component/modal/update-history';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { Skeleton } from '@/ui/skeleton';

import Api from '@/api';
import History from '@/api/type/schema/history';
import { isAdmin } from '@/api/type/schema/user';

import { useUserStore } from '@/store/user';

import { formatDate, toDate } from '@/util';

import { Pencil, Trash2 } from 'lucide-react';

type HistoryWithDate = History & { date: Date };

export default function ProgramHistoryPage() {
  const { user } = useUserStore();

  const [rawHistories, setRawHistories] = useState<History[]>();
  const [histories, setHistories] = useState<Map<number, HistoryWithDate[]> | null>(null);

  const [createHistoryModalOpen, setCreateHistoryModalOpen] = useState(false);
  const [updateHistoryModalOpen, setUpdateHistoryModalOpen] = useState(false);
  const [deleteHistoryModalOpen, setDeleteHistoryModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<History | null>(null);

  const onCreateHistory = useCallback((history: History) => {
    setRawHistories((prev) => [...prev!, history]);
  }, []);

  const onUpdateHistory = useCallback((history: History) => {
    setRawHistories((prev) => prev!.map((h) => (h.id === history.id ? history : h)));
  }, []);

  const onDeleteHistory = useCallback((id: string) => {
    setRawHistories((prev) => prev!.filter((history) => history.id !== id));
  }, []);

  useEffect(() => {
    (async () => {
      const { histories } = await Api.Domain.Program.History.getHistories();
      setRawHistories(histories);
    })();
  }, []);

  useEffect(() => {
    if (!rawHistories) return;

    const histories = rawHistories
      .map((history) => ({
        ...history,
        date: toDate(history.date),
      }))
      .sort((a, b) => b.date.getFullYear() - a.date.getFullYear());

    const groupedHistories = histories.reduce((acc, history) => {
      const year = history.date.getFullYear();
      if (!acc.has(year)) {
        acc.set(year, []);
      }
      acc.get(year)!.push(history as HistoryWithDate);
      return acc;
    }, new Map<number, HistoryWithDate[]>());

    setHistories(groupedHistories);
  }, [rawHistories]);

  return (
    <>
      <Title
        title="WINK, 우리들의 파도"
        subtitle="행사 / 세미나 / 대외 활동 기록을 년도 별로 볼 수 있습니다"
      />

      {isAdmin(user?.role) && (
        <Button variant="wink" onClick={() => setCreateHistoryModalOpen(true)}>
          연혁 추가
        </Button>
      )}

      <div className="flex flex-col space-y-8 sm:space-y-16">
        {histories ? (
          Array.from(histories).map(([year, histories]) => (
            <div key={year}>
              <h2 className="text-xl sm:text-2xl font-bold text-center">{year}</h2>

              <Accordion type="multiple" className="w-[300px] sm:w-[600px]">
                {histories.map((history: HistoryWithDate) => (
                  <AccordionItem
                    key={history.id}
                    value={history.id.toString()}
                    className="border-none"
                  >
                    <AccordionTrigger>
                      <div className="w-full flex items-center justify-between pr-2">
                        <div className="flex items-center gap-2">
                          <FaCircle className="w-1.5 h-1.5" />
                          <p className="min-w-[85px] text-neutral-600">
                            {formatDate(history.date).substring(6)}
                          </p>
                          <Separator orientation="vertical" className="h-4 bg-neutral-600" />
                          <p>{history.title}</p>
                        </div>
                        {isAdmin(user?.role) && (
                          <div className="flex space-x-2">
                            <Pencil
                              className="w-4 h-4 text-neutral-500 hover:text-black"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedHistory(history);
                                setUpdateHistoryModalOpen(true);
                              }}
                            />
                            <Trash2
                              className="w-4 h-4 text-neutral-500 hover:text-black"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedHistory(history);
                                setDeleteHistoryModalOpen(true);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                      <Image
                        src={history.image}
                        alt={history.image}
                        width={600}
                        height={338}
                        priority
                        className="w-[300px] sm:w-[600px] h-[169px] sm:h-[338px] rounded-xl object-cover"
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))
        ) : (
          <Skeleton className="w-20 h-8" />
        )}
      </div>

      <CreateHistoryModal
        open={createHistoryModalOpen}
        setOpen={setCreateHistoryModalOpen}
        callback={onCreateHistory}
      />

      <UpdateHistoryModal
        open={updateHistoryModalOpen}
        setOpen={setUpdateHistoryModalOpen}
        history={selectedHistory}
        callback={onUpdateHistory}
      />

      <DeleteHistoryModal
        open={deleteHistoryModalOpen}
        setOpen={setDeleteHistoryModalOpen}
        history={selectedHistory}
        callback={onDeleteHistory}
      />
    </>
  );
}
