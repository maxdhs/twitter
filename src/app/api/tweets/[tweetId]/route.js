import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function GET(request, response) {
  try {
    const { tweetId } = response.params;

    const tweet = await prisma.tweet.findFirst({
      where: { id: tweetId },
    });

    if (!tweet) {
      return NextResponse.json({
        success: false,
        message: "No tweet with that ID found.",
      });
    }
    return NextResponse.json({ success: true, tweet });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// PUT /api/tweets/osdi2394829348sofdij to change the tweet to update the message

export async function PUT(request, response) {
  try {
    const { tweetId } = response.params;

    // how do we extract that message from the body of the request?
    const { message } = await request.json();

    const tweet = await prisma.tweet.findFirst({
      where: { id: tweetId },
    });

    if (!tweet) {
      return NextResponse.json({
        success: false,
        message: "No tweet with that ID found.",
      });
    }

    // how do we ask prisma to edit the tweett
    const updatedTweet = await prisma.tweet.update({
      where: {
        id: tweetId,
      },
      data: { message },
    });
    return NextResponse.json({ success: true, tweet: updatedTweet });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
