import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function GET() {
  // how can i use prisma to get the real tweets from the db?
  const tweets = await prisma.tweet.findMany();

  return NextResponse.json({ success: true, tweets });
}

export async function POST(request, response) {
  // we need a message from the client
  // how can i access the json they sent in the body of their request?

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
