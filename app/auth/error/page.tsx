"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "Something went wrong!";

  if (error === "OAuthSignin") {
    errorMessage = "Error during sign in attempt.";
  } else if (error === "OAuthCallback") {
    errorMessage = "Error during callback processing.";
  } else if (error === "OAuthCreateAccount") {
    errorMessage = "Error creating account.";
  } else if (error === "EmailCreateAccount") {
    errorMessage = "Error creating email account.";
  } else if (error === "Callback") {
    errorMessage = "Error during callback processing.";
  } else if (error === "OAuthAccountNotLinked") {
    errorMessage = "Email already in use with different provider.";
  } else if (error === "EmailSignin") {
    errorMessage = "Error sending email sign in link.";
  } else if (error === "CredentialsSignin") {
    errorMessage = "Invalid credentials.";
  } else if (error === "SessionRequired") {
    errorMessage = "Please sign in to access this page.";
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <div className="flex flex-col items-center gap-y-4">
            <div className="flex items-center gap-x-2">
              <MapPin className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-semibold">Terrasspotter</h1>
            </div>
            <p className="text-muted-foreground text-sm">Authentication Error</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-y-4">
            <p className="text-destructive">{errorMessage}</p>
            <a
              href="/auth/login"
              className="text-sm text-primary hover:underline"
            >
              Back to login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}