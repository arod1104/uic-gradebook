"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Fake user for development/demo
const fakeUser = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@fakeemail.com",
  useCase:
    "This is a fake identity for testing purposes and should only be shown during app development",
  apiKey: "",
};

export default function ProfilePage() {
  const [user, setUser] = useState(fakeUser);
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);
  const router = useRouter();

  // Simulate auth check (replace with Supabase session check in prod)
  useEffect(() => {
    // In production, check Supabase session here and redirect if not signed in
    // For now, always allow for dev
  }, []);

  const handleGenerateApiKey = () => {
    // Simulate API key generation
    const newKey =
      "dev-fake-api-key-" + Math.random().toString(36).slice(2, 18);
    setApiKey(newKey);
    setShowApiKey(true);
    setAlert("Your new API key is shown below. Please save it!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-50 to-blue-200 px-4 py-12">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative z-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-2 text-center">
          Profile
        </h1>
        <div className="mb-6 text-blue-700 text-center">
          Welcome,{" "}
          <span className="font-semibold">
            {user.firstName} {user.lastName}
          </span>
        </div>
        <div className="mb-4">
          <div className="font-medium">Email:</div>
          <div className="text-gray-700">{user.email}</div>
        </div>
        <div className="mb-4">
          <div className="font-medium">Use Case:</div>
          <div className="text-gray-700">{user.useCase}</div>
        </div>
        <div className="mb-6">
          <div className="font-medium mb-1">API Key:</div>
          <div className="flex gap-2 items-center">
            <Input
              value={apiKey}
              readOnly
              className="flex-1"
              placeholder="No API key yet"
            />
            <Button onClick={handleGenerateApiKey} type="button">
              Get New API Key
            </Button>
          </div>
        </div>
        {showApiKey && (
          <Alert className="mb-4">
            <AlertTitle>API Key</AlertTitle>
            <AlertDescription>{apiKey}</AlertDescription>
          </Alert>
        )}
        {alert && (
          <Alert className="mb-4">
            <AlertTitle>Notice</AlertTitle>
            <AlertDescription>{alert}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
