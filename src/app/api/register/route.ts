import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const body = await request.json();

  const user = bodySchema.parse(body);

  await prisma.users.create({
    data: user,
  });

  return NextResponse.json({ status: 201 });
}
