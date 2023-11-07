import { NextResponse } from "next/server";
import { database } from "@/lib/pg";

export async function GET(request: Request) {
  try {
    await database.connect();

    const response = (await database.query(`select * from public.users`)).rows;

    return NextResponse.json({ users: response });
  } catch (error) {
    console.log(error);
  } finally {
    await database.end();
  }
}
