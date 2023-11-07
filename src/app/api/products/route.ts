import { NextResponse } from "next/server";
import { database } from "@/lib/pg";

export async function GET(request: Request) {
  try {
    await database.connect();

    const response = (await database.query(`select * from public.products`))
      .rows;

    return NextResponse.json({ products: response });
  } catch (error) {
    console.log(error);
  } finally {
    await database.end();
  }
}
