import { NextResponse } from "next/server";
import { database } from "@/lib/pg";

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
