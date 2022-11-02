import Link from "next/link";
import { useRouter } from "next/router";

export function Navigation() {
  const router = useRouter();

  return (
    <div className="fixed top-0 w-full">
      <div className="flex justify-center p-4 space-x-4 text-sm text-gray-500">
        <Link href="/">Home</Link>
        <Link href="/me">CSR</Link>
        <Link href="/me-ssr">SSR</Link>
        <Link href="/realtime">Realtime</Link>
      </div>
    </div>
  );
}
