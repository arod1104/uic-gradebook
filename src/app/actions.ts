"use server";

import { isValidEmail, isEmailRegistered, registerUser } from "@/lib/auth";

/**
 * Server Action: Register a new user and generate an API key.
 * Usage: Call from a client component form using useFormState or similar.
 */
export async function registerUserAction(formData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  useCase: string;
}) {
  const { email, password, firstName, lastName, useCase } = formData;

  // Validate email
  if (!isValidEmail(email)) {
    return { error: "Invalid email format." };
  }
  // Check if email already registered
  if (await isEmailRegistered(email)) {
    return { error: "Email is already registered." };
  }
  // Register user and API key
  const { message } = await registerUser({
    email,
    password,
    firstName,
    lastName,
  });
  if (error) {
    return { error };
  }
  return { userId };
}
