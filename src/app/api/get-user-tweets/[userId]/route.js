import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function GET(request, response) {
  try {
    const { userId } = response.params;

    // check if a user exists
    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "No user with that id found. No tweets available.",
      });
    }

    const tweets = await prisma.tweet.findMany({ where: { userId } });

    return NextResponse.json({ success: true, tweets });
  } catch (error) {}
}
