import type { Metadata } from "next";
import Link from "next/link";
import { getAllCommentsForAdmin, adminLogout } from "@/app/actions/admin";
import { AdminBooksPanel } from "@/components/admin/AdminBooksPanel";
import { AdminCommentsPanel } from "@/components/admin/AdminCommentsPanel";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminReflectionsPanel } from "@/components/admin/AdminReflectionsPanel";
import { AdminSiteCommentsSwitch } from "@/components/admin/AdminSiteCommentsSwitch";
import {
  isAdminAuthConfigured,
  isAdminAuthenticated,
} from "@/lib/admin/auth";
import {
  getAllBooksForAdmin,
  getAllReflectionsForAdmin,
  getContentTitleMap,
} from "@/lib/content/queries";
import { getSiteSettings } from "@/lib/content/settings";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ tab?: string }>;
};

const tabs = [
  { id: "reflections", label: "Reflections" },
  { id: "books", label: "Books" },
  { id: "comments", label: "Comments" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function resolveTab(value: string | undefined): TabId {
  if (value === "books" || value === "comments" || value === "reflections") {
    return value;
  }
  return "reflections";
}

export default async function AdminPage({ searchParams }: Props) {
  const configured = isAdminAuthConfigured();
  const authenticated = await isAdminAuthenticated();
  const { tab: tabParam } = await searchParams;
  const tab = resolveTab(tabParam);

  if (!configured) {
    return (
      <div className="mx-auto max-w-lg px-5 py-16 md:px-8 md:py-20">
        <h1 className="font-serif text-3xl text-forest">Admin</h1>
        <p className="mt-4 text-sm leading-relaxed text-forest/70">
          Add these to your <code className="text-terracotta">.env</code> file,
          then restart the dev server:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-forest px-4 py-3 text-xs text-cream">
          {`ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-password
ADMIN_SESSION_SECRET=a-long-random-string`}
        </pre>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-lg px-5 py-16 md:px-8 md:py-20">
        <h1 className="font-serif text-3xl text-forest">Admin</h1>
        <p className="mt-3 text-sm text-forest/65">
          Sign in to manage reflections, books, and comments. This page is not
          linked in the public menu.
        </p>
        <AdminLoginForm />
      </div>
    );
  }

  const [reflections, books, comments, titleMap, settings] = await Promise.all([
    getAllReflectionsForAdmin(),
    getAllBooksForAdmin(),
    getAllCommentsForAdmin(),
    getContentTitleMap(),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-forest md:text-4xl">Admin</h1>
          <p className="mt-3 text-sm text-forest/65 md:text-base">
            Create and edit reflections and books in Supabase, control comments on
            each page, and moderate reader comments.
          </p>
        </div>
        <form action={adminLogout}>
          <button
            type="submit"
            className="text-sm font-medium text-sage-deep underline-offset-2 hover:underline"
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="mt-8">
        <AdminSiteCommentsSwitch enabled={settings.comments_enabled} />
      </div>

      <nav className="mt-8 flex flex-wrap gap-2 border-b border-sage-soft pb-3">
        {tabs.map((item) => {
          const active = item.id === tab;
          return (
            <Link
              key={item.id}
              href={`/admin?tab=${item.id}`}
              className={
                active
                  ? "rounded-md bg-forest px-3.5 py-1.5 text-sm font-medium text-cream"
                  : "rounded-md px-3.5 py-1.5 text-sm font-medium text-forest/70 transition hover:bg-sage-mist/60 hover:text-forest"
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {tab === "reflections" ? (
        <AdminReflectionsPanel reflections={reflections} />
      ) : null}
      {tab === "books" ? <AdminBooksPanel books={books} /> : null}
      {tab === "comments" ? (
        <AdminCommentsPanel comments={comments} titleMap={titleMap} />
      ) : null}
    </div>
  );
}
