import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="relative w-96 h-96">
          <Image alt="Not Found" src={'/not-found.svg'} fill />
        </div>
        <p className="text-slate-600 text-xl mb-3 font-bold">
          ページが見つかりません
        </p>
        <Link href="/">ホームに戻る</Link>
      </div>
    );
  }
}
