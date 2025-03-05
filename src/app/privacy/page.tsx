import React, { ReactNode } from 'react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">개인정보 처리방침</h1>

      <p className="text-gray-700 mb-4">
        국민대학교 소프트웨어융합대학 웹 개발 동아리 WINK(이하 "WINK")는 부원의 개인정보를 중요하게
        생각하며, 『개인정보 보호법』을 준수합니다. 본 개인정보 처리방침은 WINK 홈페이지 및 관련
        서비스에서 부원의 개인정보를 어떻게 수집, 이용, 보호하는지 안내합니다.
      </p>

      <Section title="1. 수집하는 개인정보">
        <ul className="list-disc pl-6 text-gray-700">
          <li>이름, 학번, 학부(과), 전화번호, 교내 이메일 주소</li>
        </ul>
      </Section>

      <Section title="2. 개인정보의 이용 목적">
        <ul className="list-disc pl-6 text-gray-700">
          <li>부원 전용 페이지 접근 권한 부여</li>
          <li>WINK 활동 기록 및 관리</li>
        </ul>
      </Section>

      <Section title="3. 개인정보의 보관 기간">
        <p className="text-gray-700">
          WINK는 부원 탈퇴 기능을 제공하지 않으며, 개인정보는 영구적으로 보관됩니다.
        </p>
      </Section>

      <Section title="4. 개인정보의 제3자 제공">
        <p className="text-gray-700">
          WINK는 부원의 개인정보를 외부 서비스(제3자)와 공유하지 않습니다.
        </p>
      </Section>

      <Section title="5. 개인정보의 안전성 확보 조치">
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            <strong>비밀번호 암호화</strong>: bcrypt 방식으로 비밀번호를 암호화하여 저장
          </li>
          <li>
            <strong>접근 제한</strong>: 개인정보는 <strong>임원진만 접근 가능</strong>하도록 제한
          </li>
          <li>
            <strong>보안 조치</strong>: 데이터베이스 접근을 제한하고, 불필요한 개인정보 수집을
            최소화
          </li>
        </ul>
      </Section>

      <Section title="6. 개인정보 자동 수집 및 로그 정보">
        <p className="text-gray-700">
          WINK는 <strong>웹 서버 로그</strong>를 통해 방문 기록을 수집할 수 있습니다. 이는 개별
          사용자가 직접 차단할 수 없습니다.
        </p>
      </Section>

      <Section title="7. 개인정보 열람・수정 방법">
        <p className="text-gray-700">
          부원은 개인정보의 열람・정정・삭제를 요청할 수 있으며, 이를 위해{' '}
          <strong>임원진에게 직접 연락</strong>해야 합니다.
        </p>
      </Section>

      <Section title="8. 개인정보 보호책임자 및 문의처">
        <p className="text-gray-700">
          개인정보 보호와 관련된 문의는 아래 이메일을 통해 접수할 수 있습니다.
        </p>
        <p className="text-gray-900 font-semibold">이메일: kmucs.wink@gmail.com</p>
      </Section>

      <Section title="9. 개인정보 처리방침 변경">
        <p className="text-gray-700">
          본 개인정보 처리방침은 <strong>2025년 3월 5일</strong>에 제정되었습니다. 이후 변경 사항이
          있을 경우 WINK 홈페이지를 통해 공지하겠습니다.
        </p>
      </Section>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      {children}
    </div>
  );
}
