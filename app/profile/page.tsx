"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
});

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      setIsPending(true);
      // Update profile logic here
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profiel</h1>

        <Card className="p-6">
          <div className="flex items-center space-x-6 mb-8">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.jpg" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">John Doe</h2>
              <p className="text-gray-500">Lid sinds maart 2024</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Profielgegevens</h3>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                disabled={isPending}
              >
                {isEditing ? "Annuleren" : "Bewerken"}
              </Button>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naam</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEditing || isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          disabled={!isEditing || isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefoonnummer</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          disabled={!isEditing || isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isEditing && (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                  >
                    Opslaan
                  </Button>
                )}
              </form>
            </Form>
          </div>
        </Card>

        <Card className="mt-6 p-6">
          <h3 className="text-xl font-semibold mb-4">Statistieken</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-gray-500">Gemiddelde Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">12</p>
              <p className="text-gray-500">Plekken Aangeboden</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">8</p>
              <p className="text-gray-500">Plekken Geboekt</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}