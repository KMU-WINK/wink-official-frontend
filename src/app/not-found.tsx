import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-274px-56px)] space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p className="text-sm md:text-base text-neutral-600">요청하신 페이지가 존재하지 않습니다.</p>
      <Link
        href=".."
        className="px-4 py-2 text-sm font-medium text-white bg-wink-500 rounded-md hover:bg-wink-600"
      >
        뒤로가기
      </Link>
    </div>
  );
}
