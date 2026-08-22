import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80svh] flex-col justify-end px-[var(--page-pad)] pb-24">
      <p className="label">404</p>
      <h1 className="display mt-4 text-[clamp(3rem,10vw,7rem)]">
        Page not found
      </h1>
      <Link href="/" className="label link-line mt-8 w-fit">
        Back home
      </Link>
    </main>
  );
}
