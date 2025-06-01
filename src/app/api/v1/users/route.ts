import { NextRequest, NextResponse } from "next/server";
import { updateUser, deleteUser, isValidEmail } from "@/lib/auth";

// PUT /api/v1/users - Update user email (user-initiated)
export async function PUT(req: NextRequest) {
  const { userId, newEmail } = await req.json();
  if (!userId || !newEmail) {
    return NextResponse.json(
      { error: "Missing userId or newEmail." },
      { status: 400 }
    );
  }
  if (!isValidEmail(newEmail)) {
    return NextResponse.json(
      { error: "Invalid email format." },
      { status: 400 }
    );
  }
  const { success, error } = await updateUser(userId, newEmail);
  if (!success) {
    return NextResponse.json({ error }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}

// DELETE /api/v1/users - Delete user account (user-initiated)
export async function DELETE(req: NextRequest) {
  const { userId } = await req.json();
  if (!userId) {
    return NextResponse.json({ error: "Missing userId." }, { status: 400 });
  }
  const { success, error } = await deleteUser(userId);
  if (!success) {
    return NextResponse.json({ error }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
