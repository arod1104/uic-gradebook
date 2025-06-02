"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  useCase: z.string().max(300).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      useCase: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setError(null);
    setApiKey(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Registration failed.");
        return;
      }
      setApiKey(result.apiKey);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-50 to-blue-200 px-4 py-12">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative z-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-2 text-center">
          Get Your Free API Key
        </h1>
        <p className="mb-6 text-blue-700 text-center">
          Sign up for a free API key (1000 requests/day). No credit card
          required.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>At least 6 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="useCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Use Case (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-lg font-semibold py-2 rounded"
            >
              Generate API Key
            </Button>
          </form>
        </Form>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        {apiKey && (
          <div className="mt-6 bg-green-50 border border-green-300 rounded p-4 text-center">
            <div className="text-green-700 font-semibold mb-2">
              Your API Key:
            </div>
            <div className="font-mono text-green-900 text-lg break-all select-all">
              {apiKey}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Please save this key. It will not be shown again.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
