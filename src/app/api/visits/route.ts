import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE = "ak_visit";
const KEY = "portfolio:visits";

let memoryCount = 0;

async function readAndMaybeIncrement(unique: boolean) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    if (unique) {
      const res = await fetch(`${url}/incr/${KEY}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const data = (await res.json()) as { result?: number };
      return Number(data.result ?? 0);
    }
    const res = await fetch(`${url}/get/${KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = (await res.json()) as { result?: string | number | null };
    return Number(data.result ?? 0);
  }

  if (unique) memoryCount += 1;
  return memoryCount;
}

export async function GET() {
  const jar = await cookies();
  const seen = Boolean(jar.get(COOKIE));
  const count = await readAndMaybeIncrement(!seen);

  const response = NextResponse.json({ count, persisted: Boolean(process.env.UPSTASH_REDIS_REST_URL) });
  if (!seen) {
    response.cookies.set(COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 12,
      path: "/",
    });
  }
  return response;
}
