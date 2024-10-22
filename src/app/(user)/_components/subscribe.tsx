"use client";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubscribeForm() {
  return (
    <Form>
      <FormField
        name="email"
        render={({ field }) => (
          <FormItem>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <FormControl>
              <Input
                className="w-full rounded-full border-gray-200 px-6 py-3 shadow-sm"
                type="email"
                placeholder="Enter your email"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="mt-4">
        Subscribe
      </Button>
    </Form>
  );
}
