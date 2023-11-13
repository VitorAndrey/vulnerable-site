import { NextResponse } from "next/server";
import { database } from "@/lib/pg";
import { z } from "zod";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const client = await database.connect(); // Get a client from the pool

    const response = (await client.query(`select * from public.products`)).rows;

    client.release(); // Release the client back to the pool

    return NextResponse.json({ products: response });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: Request) {
  const bodySchema = z.object({
    name: z.string(),
    basePrice: z.number(),
    imageUrl: z.string(),
  });

  const body = await request.json();

  const { basePrice, imageUrl, name } = bodySchema.parse(body);

  await prisma.products.create({
    data: {
      basePrice: Number(basePrice),
      imageUrl,
      name,
    },
  });

  return NextResponse.json({ status: 201 });
}
