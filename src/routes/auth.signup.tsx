import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { AuthLayout, Field, GoogleButton } from "@/components/site/AuthLayout";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({ meta: [{ title: "Sign up — HinduInvites" }, { name: "description", content: "Create your HinduInvites account." }] }),
  component: SignupPage,
});

function SignupPage() {
  const { register, handleSubmit } = useForm<{ name: string; email: string; password: string }>();
  const navigate = useNavigate();
  const onSubmit = () => navigate({ to: "/" });

  return (
    <AuthLayout title="Begin your journey" subtitle="Create cinematic invitations your guests will treasure.">
      <GoogleButton label="Sign up with Google" />
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Full name" placeholder="Priya Sharma" register={register("name", { required: true })} />
        <Field label="Email" type="email" placeholder="you@example.com" register={register("email", { required: true })} />
        <Field label="Password" type="password" placeholder="At least 8 characters" register={register("password", { required: true })} />
        <button type="submit" className="w-full rounded-full bg-gradient-primary py-3 font-accent text-sm font-semibold text-white shadow-luxe transition hover:scale-[1.02]">
          Create account
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already with us? <Link to="/auth/login" className="font-semibold text-primary hover:underline">Login</Link>
      </p>
    </AuthLayout>
  );
}
