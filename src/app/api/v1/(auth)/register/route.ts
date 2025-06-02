import { NextRequest, NextResponse } from "next/server";
import {
  isValidEmail,
  isEmailRegistered,
  registerUserAndApiKey,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, firstName, lastName, password, useCase } = body;

  // 1. Validate email format
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Invalid email format." },
      { status: 400 }
    );
  }

  // 2. Check if email already registered
  if (await isEmailRegistered(email)) {
    return NextResponse.json(
      { error: "Email is already registered." },
      { status: 400 }
    );
  }

  // 3. Register user and API key (Supabase handles password hashing)
  const { apiKey, error } = await registerUserAndApiKey({
    email,
    password,
    firstName,
    lastName,
    useCase,
  });
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
  return NextResponse.json({ apiKey });
}
