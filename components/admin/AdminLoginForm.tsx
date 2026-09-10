"use client";

import { useState, useTransition } from "react";
import { adminLogin, type AdminActionResult } from "@/app/actions/admin";

export function AdminLoginForm() {
  const [feedback, setFeedback] = useState<AdminActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setFeedback(null);
    startTransition(async () => {
      const result = await adminLogin(formData);
      setFeedback(result);
      if (result.ok) {
        window.location.reload();
      }
    });
  }

  return (
    <form action={handleSubmit} className="mx-auto mt-10 max-w-sm space-y-5">
      <div>
        <label
          htmlFor="username"
          className="mb-1.5 block text-sm font-medium text-forest"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          disabled={isPending}
          className="w-full rounded-md border border-sage/35 bg-cream-deep/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-sage disabled:opacity-60"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-forest"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={isPending}
          className="w-full rounded-md border border-sage/35 bg-cream-deep/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-sage disabled:opacity-60"
        />
      </div>

      {feedback && !feedback.ok ? (
        <p className="text-sm text-terracotta-deep" role="status">
          {feedback.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-terracotta px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-terracotta-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
