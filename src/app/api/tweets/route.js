import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function GET() {
  const tweets = await prisma.tweet.findMany();
  return NextResponse.json({ success: true, tweets });
}

export async function POST(request, response) {
  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json({
        success: false,
        error: "You must provide a message to create a tweet.",
      });
    }
    const tweet = await prisma.tweet.create({ data: { message } });
    return NextResponse.json({ success: true, tweet });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
