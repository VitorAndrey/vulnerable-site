import { NextResponse } from "next/server";
import { database } from "@/lib/pg";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const body = await request.json();

  const id = uuidv4();
  const { name, email, password } = body;

  console.log(id, name, email, password);

  await database.connect();
  await database.query(
    `insert into users (id, name, email, password) values (${id}, ${name}, ${email}, ${password})`
  );
  await database.end();

  return NextResponse.json({ status: 201 });

  const bodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  console.log(id, name, email, password);

  try {
    await database.connect();

    await database.query(
      `insert into users (id, name, email, password) values (${id}, ${name}, ${email}, ${password})`
    );

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.log(error);
  } finally {
    await database.end();
  }
}
