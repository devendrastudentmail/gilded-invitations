import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { AuthLayout, Field, GoogleButton } from "@/components/site/AuthLayout";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Login — HinduInvites" }, { name: "description", content: "Login to HinduInvites." }] }),
  component: LoginPage,
});

function LoginPage() {
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();
  const navigate = useNavigate();
  const onSubmit = () => navigate({ to: "/" });

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue planning your celebration.">
      <GoogleButton label="Login with Google" />
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Email" type="email" placeholder="you@example.com" register={register("email", { required: true })} />
        <Field label="Password" type="password" placeholder="••••••••" register={register("password", { required: true })} />
        <div className="text-right">
          <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot password?</a>
        </div>
        <button type="submit" className="w-full rounded-full bg-gradient-primary py-3 font-accent text-sm font-semibold text-white shadow-luxe transition hover:scale-[1.02]">
          Login
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here? <Link to="/auth/signup" className="font-semibold text-primary hover:underline">Create an account</Link>
      </p>
    </AuthLayout>
  );
}
