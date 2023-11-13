import { NextResponse } from "next/server";
import { Pool } from "pg";
import { z } from "zod";

import { database } from "@/lib/pg";

export async function POST(request: Request) {
  const bodySchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const body = await request.json();

  const user = bodySchema.parse(body);

  const { email, password } = user;

  try {
    const client = await database.connect(); // Get a client from the connection pool

    const response = (
      await client.query(
        `SELECT * FROM public.users WHERE email = '${email}' AND password = '${password}'`
      )
    ).rows;

    client.release(); // Release the client back to the pool

    if (response.length < 1) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 404,
        }
      );
    } else {
      return NextResponse.json(
        {
          user: response[0],
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
