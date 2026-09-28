export type Reflection = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  body: string[];
  comments_enabled: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type BookStatus = "Published" | "Coming Soon" | "Pre-order";

export type Book = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  status: BookStatus;
  author: string;
  purchase_url: string | null;
  images: string[];
  about: string[];
  comments_enabled: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type PublicReflection = Omit<
  Reflection,
  "published" | "created_at" | "updated_at"
>;

export type PublicBook = Omit<Book, "published" | "created_at" | "updated_at">;
