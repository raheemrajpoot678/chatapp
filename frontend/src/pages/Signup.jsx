import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/components/form";

import { Label } from "@/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@/ui/components/radio-group";

import { Input } from "@/ui/components/input";
import useSignup from "@/hooks/useSignup";
import { Link } from "react-router-dom";

// Define the schema with correct password matching
const formSchema = z
  .object({
    fullname: z.string().min(3, {
      message: "Full Name must be at least 3 characters.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmpassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters.",
    }),
    gender: z.enum(["male", "female"], {
      required_error: "You need to select a notification type.",
    }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords must match.",
    path: ["confirmpassword"], // This sets the error on the confirmpassword field
  });

export default function Signup() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      confirmpassword: "",
      gender: "male",
    },
  });

  const { signup, loading } = useSignup();

  function onSubmit(values) {
    signup(values);
  }

  return (
    <div className="max-w-[23rem] mx-auto mt-[8rem]">
      <h2 className="text-center my-6 text-3xl font-semibold">Sign Up</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <p className="font-semibold text-slate-600">Gender: </p>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="text-stone-600">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="text-stone-600">
                        Female
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit" className="w-full">
            Sign up
          </Button>
          <p className="text-sm  mt-3">
            Have Already an account?{" "}
            <Link to="/login" className="text-blue-600">
              Log in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
