import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Hello
      <Link href="/app" className="p-1">
        Launch App
      </Link>
    </div>
  );
}
