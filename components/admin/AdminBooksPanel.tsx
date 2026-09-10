"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  deleteBook,
  saveBook,
  toggleCommentsEnabled,
  type ContentActionResult,
} from "@/app/actions/content";
import { textFromParagraphs } from "@/lib/content/form";
import type { Book } from "@/lib/content/types";
import { AdminToggleSwitch } from "@/components/admin/AdminToggleSwitch";

type Props = {
  books: Book[];
};

const emptyForm = {
  id: "",
  title: "",
  slug: "",
  subtitle: "",
  description: "",
  status: "Published",
  author: "Isioma Aniugbo",
  purchaseUrl: "",
  images: "",
  about: "",
  sortOrder: "0",
  commentsEnabled: true,
  published: true,
};

export function AdminBooksPanel({ books }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [feedback, setFeedback] = useState<ContentActionResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const editing = Boolean(form.id);

  function loadBook(book: Book) {
    setFeedback(null);
    setForm({
      id: book.id,
      title: book.title,
      slug: book.slug,
      subtitle: book.subtitle,
      description: book.description,
      status: book.status,
      author: book.author,
      purchaseUrl: book.purchase_url ?? "",
      images: book.images.join("\n"),
      about: textFromParagraphs(book.about),
      sortOrder: String(book.sort_order),
      commentsEnabled: book.comments_enabled,
      published: book.published,
    });
  }

  function resetForm() {
    setForm(emptyForm);
    setFeedback(null);
  }

  function handleSave(formData: FormData) {
    setFeedback(null);
    startTransition(async () => {
      const result = await saveBook(formData);
      setFeedback(result);
      if (result.ok) {
        resetForm();
        router.refresh();
      }
    });
  }

  function handleDelete(formData: FormData) {
    if (!window.confirm("Delete this book permanently?")) return;
    setFeedback(null);
    startTransition(async () => {
      const result = await deleteBook(formData);
      setFeedback(result);
      if (result.ok) {
        resetForm();
        router.refresh();
      }
    });
  }

  function handleToggle(book: Book) {
    const formData = new FormData();
    formData.set("kind", "book");
    formData.set("id", book.id);
    formData.set("slug", book.slug);
    formData.set("enabled", book.comments_enabled ? "false" : "true");
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
          {editing ? "Edit book" : "New book"}
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
            label="Subtitle"
            name="subtitle"
            value={form.subtitle}
            disabled={isPending}
            onChange={(value) => setForm((f) => ({ ...f, subtitle: value }))}
          />
          <Field
            label="Short description"
            name="description"
            value={form.description}
            disabled={isPending}
            onChange={(value) => setForm((f) => ({ ...f, description: value }))}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label
                htmlFor="status"
                className="mb-1.5 block text-sm font-medium text-forest"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                disabled={isPending}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value }))
                }
                className="w-full rounded-md border border-sage/35 bg-cream-deep/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-sage disabled:opacity-60"
              >
                <option value="Published">Published</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>
            <Field
              label="Author"
              name="author"
              value={form.author}
              disabled={isPending}
              onChange={(value) => setForm((f) => ({ ...f, author: value }))}
            />
            <Field
              label="Sort order"
              name="sortOrder"
              value={form.sortOrder}
              disabled={isPending}
              onChange={(value) => setForm((f) => ({ ...f, sortOrder: value }))}
            />
          </div>
          <Field
            label="Purchase URL"
            name="purchaseUrl"
            value={form.purchaseUrl}
            disabled={isPending}
            hint="Optional Selar (or other) link"
            onChange={(value) => setForm((f) => ({ ...f, purchaseUrl: value }))}
          />
          <div>
            <label
              htmlFor="images"
              className="mb-1.5 block text-sm font-medium text-forest"
            >
              Image paths / URLs
            </label>
            <textarea
              id="images"
              name="images"
              rows={3}
              disabled={isPending}
              value={form.images}
              onChange={(e) =>
                setForm((f) => ({ ...f, images: e.target.value }))
              }
              placeholder={"/brand/books/cover.jpeg\n/brand/books/preview.jpeg"}
              className="w-full resize-y rounded-md border border-sage/35 bg-cream-deep/40 px-3.5 py-2.5 text-sm outline-none transition focus:border-sage disabled:opacity-60"
            />
            <p className="mt-1 text-xs text-forest/45">
              One path or URL per line (files in /public work as /brand/…)
            </p>
          </div>
          <div>
            <label
              htmlFor="about"
              className="mb-1.5 block text-sm font-medium text-forest"
            >
              About / details
            </label>
            <textarea
              id="about"
              name="about"
              required
              rows={8}
              disabled={isPending}
              value={form.about}
              onChange={(e) => setForm((f) => ({ ...f, about: e.target.value }))}
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
              {isPending ? "Saving…" : editing ? "Update book" : "Create book"}
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
        <h2 className="font-serif text-2xl text-forest">All books</h2>
        {books.length === 0 ? (
          <p className="mt-4 text-sm italic text-forest/55">
            No books in Supabase yet. Run the migration SQL, then create one here.
          </p>
        ) : (
          <ul className="mt-5 space-y-4">
            {books.map((book) => (
              <li
                key={book.id}
                className="rounded-xl border border-sage-soft/80 bg-cream px-5 py-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-serif text-lg text-forest">{book.title}</p>
                    <p className="mt-1 text-xs text-forest/50">
                      /bookshelf/{book.slug} · {book.status}
                      {!book.published ? " · draft" : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => loadBook(book)}
                      className="rounded-md border border-sage/40 px-3 py-1.5 text-xs font-medium text-forest transition hover:bg-sage-mist/50"
                    >
                      Edit
                    </button>
                    <AdminToggleSwitch
                      checked={book.comments_enabled}
                      disabled={isPending}
                      label={
                        book.comments_enabled ? "Comments on" : "Comments off"
                      }
                      onClick={() => handleToggle(book)}
                    />
                    <form action={handleDelete}>
                      <input type="hidden" name="id" value={book.id} />
                      <input type="hidden" name="slug" value={book.slug} />
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
