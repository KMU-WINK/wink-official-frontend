import Link from 'next/link';

const REQUEST_EXAMPLE = `{
  "clientId": "클라이언트_ID",
  "clientSecret": "클라이언트_시크릿",
  "token": "임시_인증_토큰"
}`;

const RESPONSE_EXAMPLE = `{
  "statusCode": 200,
  "error": null,
  "content": {
    "user": {
      // 사용자 정보
    },
    "scopes": ["NAME", "STUDENT_ID"]
  }
}`;

export default function Home() {
  return (
    <div className="container mx-auto mt-10 p-4 space-y-8 ">
      <h1 className="text-3xl font-bold mb-6">Wink OAuth 통합 가이드</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. 애플리케이션 등록</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <Link href="/application" className="text-blue-500 hover:text-blue-500/90">
              WINK 공식 홈페이지의 애플리케이션 메뉴
            </Link>
            에서 생성합니다.
          </li>
          <li>애플리케이션을 생성하면 고유한 클라이언트 ID와 클라이언트 시크릿이 발급됩니다.</li>
          <li>
            이 정보는 안전하게 보관하세요. 클라이언트 시크릿은 외부에 노출되지 않도록 주의해야
            합니다.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. OAuth 설정</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>애플리케이션 설정에서 "Wink 로그인" 옵션을 활성화합니다.</li>
          <li>하나 이상의 콜백 URL을 등록합니다. 이는 인증 후 사용자가 리디렉션될 URL입니다.</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. 인증 프로세스</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">3.1 로그인 요청</h3>
          <p>사용자를 다음 URL로 리디렉션하여 Wink 로그인 페이지로 안내합니다:</p>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="font-mono">
              https://wink.kookmin.ac.kr/application/{'{client_id}'}/oauth?callback=
              {'{callback_url}'}
            </p>
          </div>
          <ul className="list-disc list-inside">
            <li>{'{client_id}'}: 애플리케이션 클라이언트 ID</li>
            <li>{'{callback_url}'}: 등록된 콜백 URL 중 하나</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">3.2 인증 완료</h3>
          <p>사용자가 성공적으로 인증되면, 지정된 콜백 URL로 리디렉션됩니다:</p>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="font-mono">
              {'{callback_url}'}?token={'{token}'}
            </p>
          </div>
          <ul className="list-disc list-inside">
            <li>{'{token}'}: 임시 인증 토큰</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. 액세스 토큰 교환</h2>
        <p>임시 토큰을 사용자 정보로 교환하려면 다음 API를 호출하세요.</p>
        <p>
          <strong>POST</strong> https://wink.kookmin.ac.kr/api/application/oauth/token
        </p>

        <div>
          <h3 className="font-semibold">요청 본문</h3>
          <pre className="bg-gray-100 p-4 rounded-md">{REQUEST_EXAMPLE}</pre>
        </div>
        <div>
          <h3 className="font-semibold">응답 예시</h3>
          <pre className="bg-gray-100 p-4 rounded-md">{RESPONSE_EXAMPLE}</pre>
        </div>
      </section>
    </div>
  );
}
