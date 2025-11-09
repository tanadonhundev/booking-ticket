"use client";

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
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });

  const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onRequest: (ctx) => {
            //show loading
            console.log("loading", ctx.body);
          },
          onSuccess: async (ctx) => {
            //redirect to the dashboard or sign in page
            console.log("success", ctx.data);
            // get session (client side)
            const { data: session } = await authClient.getSession();
            if (session?.user.role === "admin") {
              router.replace("/admin/booking");
            } else if (session?.user.role === "user") {
              router.replace("/");
            }
            // router.replace("/");
            toast.success("เข้าสู่ระบบสำเร็จ");
          },
          onError: (ctx) => {
            // display the error message
            toast.error(ctx.error.message);
          },
        }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/70">
      <div className="relative max-w-sm w-full border rounded-xl px-8 py-8 shadow-lg/5 dark:shadow-xl bg-card overflow-hidden">
        <div className="relative isolate flex flex-col items-center">
          <>logo</>
          <p className="mt-4 text-xl font-semibold tracking-tight">
            เข้าสู่ระบบ
          </p>
          <Form {...form}>
            <form
              className="w-full space-y-6"
              onSubmit={form.handleSubmit(handleOnSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="w-full"
                        {...field}
                      />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Continue with Email
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
