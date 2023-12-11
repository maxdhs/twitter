import { tweets } from "@/lib/tweets.js";
import { NextResponse } from "next/server.js";

export function GET() {
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
    const tweet = { id: tweets.length + 1, message };

    tweets.push(tweet);
    return NextResponse.json({ success: true, tweets });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
