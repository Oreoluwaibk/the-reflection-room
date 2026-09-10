"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  deleteReflection,
  saveReflection,
  toggleCommentsEnabled,
  type ContentActionResult,
} from "@/app/actions/content";
import { textFromParagraphs } from "@/lib/content/form";
import type { Reflection } from "@/lib/content/types";
import { AdminToggleSwitch } from "@/components/admin/AdminToggleSwitch";

type Props = {
  reflections: Reflection[];
};

const emptyForm = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  category: "Growth",
  date: "",
  author: "Isioma Anis",
  body: "",
  commentsEnabled: true,
  published: true,
};

export function AdminReflectionsPanel({ reflections }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [feedback, setFeedback] = useState<ContentActionResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const editing = Boolean(form.id);

  function loadReflection(post: Reflection) {
    setFeedback(null);
    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category,
      date: post.date,
      author: post.author,
      body: textFromParagraphs(post.body),
      commentsEnabled: post.comments_enabled,
      published: post.published,
    });
  }

  function resetForm() {
    setForm(emptyForm);
    setFeedback(null);
  }

  function handleSave(formData: FormData) {
    setFeedback(null);
    startTransition(async () => {
      const result = await saveReflection(formData);
      setFeedback(result);
      if (result.ok) {
        resetForm();
        router.refresh();
      }
    });
  }

  function handleDelete(formData: FormData) {
    if (!window.confirm("Delete this reflection permanently?")) return;
    setFeedback(null);
    startTransition(async () => {
      const result = await deleteReflection(formData);
      setFeedback(result);
      if (result.ok) {
        resetForm();
        router.refresh();
      }
    });
  }

  function handleToggle(post: Reflection) {
    const formData = new FormData();
    formData.set("kind", "reflection");
    formData.set("id", post.id);
    formData.set("slug", post.slug);
    formData.set("enabled", post.comments_enabled ? "false" : "true");
    startTransition(async () => {
      const result = await toggleCommentsEnabled(formData);
      setFeedback(result);
      if (result.ok) router.refresh();
    });
  }

  return (
    <div className="mt-8 space-y-10">
      <div>
        <h2 className="font-serif text-2xl text-forest">
          {editing ? "Edit reflection" : "New reflection"}
        </h2>
        <form action={handleSave} className="mt-5 space-y-4">
          {form.id ? <input type="hidden" name="id" value={form.id} /> : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Title"
              name="title"
              value={form.title}
              required
              disabled={isPending}
              onChange={(value) => setForm((f) => ({ ...f, title: value }))}
            />
            <Field
              label="Slug"
              name="slug"
              value={form.slug}
              disabled={isPending}
              hint="Leave blank to generate from title"
              onChange={(value) => setForm((f) => ({ ...f, slug: value }))}
            />
          </div>
          <Field
            label="Excerpt"
            name="excerpt"
            value={form.excerpt}
            disabled={isPending}
            onChange={(value) => setForm((f) => ({ ...f, excerpt: value }))}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              label="Category"
              name="category"
              value={form.category}
              disabled={isPending}
              onChange={(value) => setForm((f) => ({ ...f, category: value }))}
            />
            <Field
              label="Date label"
              name="date"
              value={form.date}
              disabled={isPending}
              hint="e.g. September 3, 2026"
              onChange={(value) => setForm((f) => ({ ...f, date: value }))}
            />
            <Field
              label="Author"
              name="author"
              value={form.author}
              disabled={isPending}
              onChange={(value) => setForm((f) => ({ ...f, author: value }))}
            />
          </div>
          <div>
            <label
              htmlFor="body"
              className="mb-1.5 block text-sm font-medium text-forest"
            >
              Body
            </label>
            <textarea
              id="body"
              name="body"
              required
              rows={12}
              disabled={isPending}
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              placeholder="Separate paragraphs with a blank line."
              className="w-full resize-y rounded-md border border-sage/35 bg-cream-deep/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-sage disabled:opacity-60"
            />
          </div>
          <div className="flex flex-wrap gap-6">
            <Toggle
              name="commentsEnabled"
              label="Show comments on page"
              checked={form.commentsEnabled}
              disabled={isPending}
              onChange={(checked) =>
                setForm((f) => ({ ...f, commentsEnabled: checked }))
              }
            />
            <Toggle
              name="published"
              label="Published"
              checked={form.published}
              disabled={isPending}
              onChange={(checked) =>
                setForm((f) => ({ ...f, published: checked }))
              }
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-terracotta px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-terracotta-deep disabled:opacity-60"
            >
              {isPending ? "Saving…" : editing ? "Update reflection" : "Create reflection"}
            </button>
            {editing ? (
              <button
                type="button"
                disabled={isPending}
                onClick={resetForm}
                className="rounded-md border border-sage/40 px-5 py-2.5 text-sm font-medium text-forest transition hover:bg-sage-mist/50"
              >
                Cancel edit
              </button>
            ) : null}
          </div>
        </form>
      </div>

      {feedback ? (
        <p
          className={
            feedback.ok ? "text-sm text-sage-deep" : "text-sm text-terracotta-deep"
          }
          role="status"
        >
          {feedback.message}
        </p>
      ) : null}

      <div>
        <h2 className="font-serif text-2xl text-forest">All reflections</h2>
        {reflections.length === 0 ? (
          <p className="mt-4 text-sm italic text-forest/55">
            No reflections in Supabase yet. Run the migration SQL, then create one
            here.
          </p>
        ) : (
          <ul className="mt-5 space-y-4">
            {reflections.map((post) => (
              <li
                key={post.id}
                className="rounded-xl border border-sage-soft/80 bg-cream px-5 py-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-serif text-lg text-forest">{post.title}</p>
                    <p className="mt-1 text-xs text-forest/50">
                      /reflections/{post.slug}
                      {!post.published ? " · draft" : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => loadReflection(post)}
                      className="rounded-md border border-sage/40 px-3 py-1.5 text-xs font-medium text-forest transition hover:bg-sage-mist/50"
                    >
                      Edit
                    </button>
                    <AdminToggleSwitch
                      checked={post.comments_enabled}
                      disabled={isPending}
                      label={
                        post.comments_enabled ? "Comments on" : "Comments off"
                      }
                      onClick={() => handleToggle(post)}
                    />
                    <form action={handleDelete}>
                      <input type="hidden" name="id" value={post.id} />
                      <input type="hidden" name="slug" value={post.slug} />
                      <button
                        type="submit"
                        disabled={isPending}
                        className="rounded-md px-3 py-1.5 text-xs font-medium text-terracotta-deep transition hover:bg-terracotta/10"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  required,
  disabled,
  hint,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-forest"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-sage/35 bg-cream-deep/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-sage disabled:opacity-60"
      />
      {hint ? <p className="mt-1 text-xs text-forest/45">{hint}</p> : null}
    </div>
  );
}

function Toggle({
  name,
  label,
  checked,
  disabled,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-forest">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 rounded border-sage/50 text-terracotta focus:ring-sage"
      />
      {label}
    </label>
  );
}
