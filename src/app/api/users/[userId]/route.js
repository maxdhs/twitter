import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function DELETE(request, response) {
  try {
    const { userId } = response.params;
    const user = await prisma.user.delete({ where: { id: userId } });
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
