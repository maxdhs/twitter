import { tweets } from "@/lib/tweets.js";
import { NextResponse } from "next/server.js";

export function GET(request, response) {
  const { tweetId } = response.params;
  const tweet = tweets.filter((tweet) => tweet.id === +tweetId)[0];
  if (!tweet) {
    return NextResponse.json({
      success: false,
      message: "No tweet with that ID found.",
    });
  }
  return NextResponse.json({ success: true, tweet });
}
