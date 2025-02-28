import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/ui/dialog';

interface PrivacyModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function PrivacyModal({ open, setOpen }: PrivacyModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>개인정보처리약관</DialogTitle>
          <DialogDescription>
            WINK는 「개인정보 보호법」에 따라 다음과 같이 개인정보를 수집·이용합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <section>
            <h2 className="font-medium">1. 수집 항목 및 이용 목적</h2>
            <p className="ml-5">가. 수집 항목 (필수)</p>
            <ul className="list-disc ml-14">
              <li>이름, 학번, 학부(과), 이메일, 전화번호</li>
            </ul>
            <p className="ml-5">나. 수집 항목 (선택)</p>
            <ul className="list-disc ml-14">
              <li>Github 주소</li>
            </ul>
            <p className="ml-5">다. 이용 목적</p>
            <ul className="list-disc ml-14">
              <li>WINK 신입부원 모집 및 선발</li>
              <li>지원자 연락 및 확인</li>
              <li>지원자 관리</li>
            </ul>
          </section>
          <section>
            <h2 className="font-medium">2. 개인정보 보유 및 이용 기간</h2>
            <p className="ml-5">모집 종료 후 6개월간 보관 후 파기</p>
          </section>
          <section>
            <h2 className="font-medium">3. 동의 거부 권리 및 불이익</h2>
            <p className="ml-5">
              개인정보 제공을 거부할 수 있으나, 미동의 시 신입부원 모집에 지원할 수 없습니다.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
