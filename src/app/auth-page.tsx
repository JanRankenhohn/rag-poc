"use client";

import { signIn, signOut, useSession } from "@/lib/auth/client";
import Image from "next/image";

export default function AuthPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Welcome
        </h1>
        <button
          onClick={() =>
            signIn.social({ provider: "github", callbackURL: "/" })
          }
          className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current"
            aria-hidden="true"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-4">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name}
            width={80}
            height={80}
            className="rounded-full ring-2 ring-zinc-200 dark:ring-zinc-700"
          />
        )}
        <div className="text-center">
          <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {session.user.name}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {session.user.email}
          </p>
        </div>
      </div>
      <button
        onClick={() => signOut({ fetchOptions: { onSuccess: () => {} } })}
        className="rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        Sign out
      </button>
    </div>
  );
}
