import supabase from "../supabase/client";
import { v4 as uuidv4 } from "uuid";

/**
 * Checks if the provided email string is in a valid email format.
 * @param email - The email address to validate.
 * @returns boolean - True if the email is valid, false otherwise.
 */
export function isValidEmail(email: string): boolean {
  // Simple email regex
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

/**
 * Checks if the given email is already registered in the Supabase users table.
 * @param email - The email address to check for existence.
 * @returns Promise<boolean> - Resolves to true if the email exists, false otherwise.
 */
export async function isEmailRegistered(email: string): Promise<boolean> {
  // Query the auth.users table for the email
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  return !!data;
}

/**
 * Registers a new user with Supabase Auth and creates an API key for them.
 * @param params - An object containing email, password, firstName, lastName, and useCase.
 * @returns Promise<{ apiKey?: string; error?: string }> - Resolves with the API key if successful, or an error message.
 * @remarks
 * - Supabase automatically hashes the password; it is never stored in plaintext.
 * - The API key is stored in the api_keys table and associated with the user.
 */
export async function registerUserAndApiKey({
  email,
  password,
  firstName,
  lastName,
  useCase,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  useCase: string;
}): Promise<{ apiKey?: string; error?: string }> {
  // Register user (Supabase handles password hashing)
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (signUpError || !signUpData.user) {
    return { error: signUpError?.message || "Registration failed." };
  }

  // Generate API key
  const newApiKey = uuidv4();

  // Store API key
  const { error: keyError } = await supabase.from("api_keys").insert({
    user_id: signUpData.user.id,
    api_key: newApiKey,
    use_case: useCase,
    tier: "free",
  });

  if (keyError) {
    return { error: "Failed to save API key. Please contact support." };
  }
  return { apiKey: newApiKey };
}

/**
 * Updates the email address of an existing user in Supabase Auth.
 * @param userId - The user's unique id (from Supabase Auth).
 * @param newEmail - The new email address to set.
 * @returns Promise<{ success: boolean; error?: string }> - Resolves with success true if updated, or error message.
 */
export async function updateUser(
  userId: string,
  newEmail: string
): Promise<{ success: boolean; error?: string }> {
  // Check if new email is valid
  if (!isValidEmail(newEmail)) {
    return { success: false, error: "Invalid email format." };
  }
  // Check if new email is already registered
  if (await isEmailRegistered(newEmail)) {
    return { success: false, error: "Email is already registered." };
  }
  // Update email in Supabase Auth
  const { error } = await supabase.auth.admin.updateUserById(userId, {
    email: newEmail,
  });
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

/**
 * Deletes a user from the Supabase Auth users table by userId.
 * @param userId - The user's unique id (from Supabase Auth).
 * @returns Promise<{ success: boolean; error?: string }> - Resolves with success true if deleted, or error message.
 */
export async function deleteUser(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}
