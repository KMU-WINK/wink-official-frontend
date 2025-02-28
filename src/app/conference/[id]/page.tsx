'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  IconMHuggingFace,
  IconMSadButRelievedFace,
  IconMSunWithFace,
} from 'react-fluentui-emoji/lib/modern';

import { Button } from '@/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/ui/table';

import Api from '@/api';
import Conference from '@/api/type/schema/conference';
import User from '@/api/type/schema/user';
import { useApi, useApiWithToast } from '@/api/useApi';

import { formatDate, formatTime } from '@/util';

import Loading from '@/app/loading';

interface ConferenceDetailPageProps {
  params: { id: string };
}

export default function ConferenceDetailPage({ params }: ConferenceDetailPageProps) {
  const [isApi, startApi] = useApiWithToast();
  const [, startApi2] = useApi();

  const [conference, setConference] = useState<Conference>();
  const [survey, setSurvey] = useState(false);
  const [participant, setParticipant] = useState(false);

  const [president, setPresident] = useState<User>();

  const Icon = useMemo(
    () => (survey ? (participant ? IconMHuggingFace : IconMSadButRelievedFace) : IconMSunWithFace),
    [survey, participant],
  );

  const onSurveyAbsent = useCallback(() => {
    startApi(
      async () => {
        await Api.Domain.Conference.surveyAbsent(params.id);
        setSurvey(true);
        setParticipant(false);
      },
      {
        loading: '정기 회의에 불참석 투표를 하고있습니다.',
        success: '정기 회의에 불참석 투표를 했습니다.',
      },
    );
  }, [params.id]);

  const onSurveyPresent = useCallback(() => {
    startApi(
      async () => {
        await Api.Domain.Conference.surveyPresent(params.id);
        setSurvey(true);
        setParticipant(true);
      },
      {
        loading: '정기 회의에 참석 투표를 하고있습니다.',
        success: '정기 회의에 참석 투표를 했습니다.',
      },
    );
  }, [params.id]);

  useEffect(() => {
    startApi2(async () => {
      const { conference } = await Api.Domain.Conference.getConference(params.id);
      setConference(conference);
    });
  }, [params.id]);

  useEffect(() => {
    startApi2(async () => {
      const { survey, participant } = await Api.Domain.Conference.current(params.id);
      setSurvey(survey);
      setParticipant(participant);
    });
  }, [params.id]);

  useEffect(() => {
    startApi2(async () => {
      const { users } = await Api.Domain.User.getUsers();
      const president = users.filter((user) => user.role === 'PRESIDENT')[0];
      setPresident(president);
    });
  }, []);

  if (!conference) return <Loading />;

  return (
    <div className="flex flex-col space-y-4 items-center justify-center p-6 md:p-10 min-h-[calc(100dvh-56px-274px)]">
      <div className="size-[56px] md:size-[96px]">
        <Icon size="auto" />
      </div>

      <h1 className="text-xl md:text-2xl font-semibold">
        {formatDate(new Date(conference.date))} 정기 회의
      </h1>

      <Table className="w-fit justify-self-center">
        <TableBody>
          <TableRow>
            <TableHead>날짜</TableHead>
            <TableCell>{formatDate(new Date(conference.date), true)}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>시간</TableHead>
            <TableCell>{formatTime(new Date(conference.date))}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead>장소</TableHead>
            <TableCell>{conference.location}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="flex space-x-2">
        <Button
          variant="destructive"
          disabled={isApi || (survey && !participant)}
          onClick={onSurveyAbsent}
        >
          불참석
        </Button>
        <Button
          variant="wink"
          disabled={isApi || (survey && participant)}
          onClick={onSurveyPresent}
        >
          참석
        </Button>
      </div>

      {survey && !participant && (
        <div className="flex flex-col space-y-1  text-center text-sm">
          <p className="text-red-500 font-medium">아래 연락처로 사유를 보내주세요</p>
          <p className="text-neutral-500">
            {president?.name} ({president?.phoneNumber})
          </p>
        </div>
      )}
    </div>
  );
}
