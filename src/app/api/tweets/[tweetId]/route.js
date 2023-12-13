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

export async function PUT(request, response) {
  try {
    const { tweetId } = response.params;
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
