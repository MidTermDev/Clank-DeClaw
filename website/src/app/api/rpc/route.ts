import { NextRequest, NextResponse } from "next/server";

const RPC_URL = process.env.RPC_URL!;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
