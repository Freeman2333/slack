import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuthActions } from "@convex-dev/auth/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signinSchema } from "../schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AuthFlow } from "../types";
import { TriangleAlert } from "lucide-react";

interface SignInCardProps {
  setMode: (mode: AuthFlow) => void;
}

export const SignInCard = ({ setMode }: SignInCardProps) => {
  const { signIn } = useAuthActions();

  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (service: "github" | "google") => {
    setIsPending(true);

    signIn(service).finally(() => {
      setIsPending(false);
    });
  };

  const onSubmit = (values: z.infer<typeof signinSchema>) => {
    setIsPending(true);

    signIn("password", {
      email: values.email,
      password: values.password,
      flow: "signIn",
    })
      .catch(() => setError("Something went wrong."))
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mx-7">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="p-7 space-y-4">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} size="lg" className="w-full">
              Continue
            </Button>
          </form>
        </Form>
        <Separator className="my-4" />
        <Button
          onClick={() => handleLogin("google")}
          disabled={isPending}
          variant="outline"
          size="lg"
          className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
          Continue with Google
        </Button>
        <Button
          disabled={isPending}
          onClick={() => handleLogin("github")}
          variant="outline"
          size="lg"
          className="w-full"
        >
          <FaGithub className="mr-2 size-5" />
          Continue with Github
        </Button>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?
          <button
            type="button"
            onClick={() => setMode("sign-up")}
            className="text-xs text-sky-700 ml-1 hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </CardContent>
    </Card>
  );
};
