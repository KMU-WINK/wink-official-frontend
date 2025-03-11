'use client';

import { useEffect, useMemo, useState } from 'react';

import InterviewChart from '@/app/admin/recruit/[id]/statistics/_component/interview';
import PaperChart from '@/app/admin/recruit/[id]/statistics/_component/paper';
import StudentIdInterviewFailChart from '@/app/admin/recruit/[id]/statistics/_component/student-id-interview-fail';
import StudentIdInterviewPassChart from '@/app/admin/recruit/[id]/statistics/_component/student-id-interview-pass';
import StudentIdInterviewTotalChart from '@/app/admin/recruit/[id]/statistics/_component/student-id-interview-total';
import StudentIdPaperFailChart from '@/app/admin/recruit/[id]/statistics/_component/student-id-paper-fail';
import StudentIdPaperPassChart from '@/app/admin/recruit/[id]/statistics/_component/student-id-paper-pass';
import StudentIdPaperTotalChart from '@/app/admin/recruit/[id]/statistics/_component/student-id-paper-total';

import Api from '@/api';
import Recruit from '@/api/type/schema/recruit';
import RecruitForm from '@/api/type/schema/recruit-form';
import { useApi } from '@/api/useApi';

import Loading from '@/app/loading';

interface AdminRecruitStatisticsPageProps {
  params: { id: string };
}

export default function AdminRecruitStatisticsPage({ params }: AdminRecruitStatisticsPageProps) {
  const [, startApi] = useApi();

  const [recruit, setRecruit] = useState<Recruit>();
  const [forms, setForms] = useState<RecruitForm[]>([]);

  useEffect(() => {
    startApi(async () => {
      const { recruit } = await Api.Domain.AdminRecruit.getRecruit(params.id);
      setRecruit(recruit);

      const { forms } = await Api.Domain.AdminRecruitForm.getForms(params.id);
      setForms(forms);
    });
  }, [params.id]);

  const sortedByStudentId = useMemo(
    () => forms.sort((a, b) => b.studentId.localeCompare(a.studentId)),
    [forms],
  );

  if (!recruit) return <Loading />;

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">전체 통계</h1>
        <div className="flex flex-wrap gap-4">
          <PaperChart forms={forms} />
          <InterviewChart forms={forms} />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">서류 학번별 통계</h1>
        <div className="flex flex-wrap gap-4">
          <StudentIdPaperTotalChart forms={sortedByStudentId} />
          <StudentIdPaperPassChart forms={sortedByStudentId} />
          <StudentIdPaperFailChart forms={sortedByStudentId} />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">면접 학번별 통계</h1>
        <div className="flex flex-wrap gap-4">
          <StudentIdInterviewTotalChart forms={sortedByStudentId} />
          <StudentIdInterviewPassChart forms={sortedByStudentId} />
          <StudentIdInterviewFailChart forms={sortedByStudentId} />
        </div>
      </section>
    </div>
  );
}
