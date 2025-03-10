"use client";

import { Card } from "@/components/ui/card";
import { SettingsForm } from "@/components/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <Card className="p-6">
        <SettingsForm />
      </Card>
    </div>
  );
}