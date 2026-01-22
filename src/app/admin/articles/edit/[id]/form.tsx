"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateArticle } from "../../../actions";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditArticleForm({ item }: { item: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      content: formData.get("content"),
      excerpt: formData.get("excerpt"),
      image_url: formData.get("image_url"),
      published: formData.get("published") === "on",
      published_date: formData.get("published_date") ? new Date(formData.get("published_date") as string).toISOString() : new Date().toISOString(),
    };

    const result = await updateArticle(item.id, data);

    if (result.success) {
      router.push("/admin/articles");
    } else {
      setError(result.error || "Failed to update article");
      setLoading(false);
    }
  };

  // Format date for input
  const dateValue = item.published_date ? new Date(item.published_date).toISOString().slice(0, 16) : "";

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Edit Article</h1>
        <Link href="/admin/articles" className="admin-btn admin-btn--secondary">
          Back
        </Link>
      </div>

      <div className="admin-card">
        {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="admin-form">
          <input type="hidden" name="id" value={item.id} />

          <div className="admin-form__group">
            <label className="admin-form__label">Title</label>
            <input name="title" required defaultValue={item.title} className="admin-form__input" placeholder="Article Title" />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Slug</label>
            <input name="slug" defaultValue={item.slug} className="admin-form__input" placeholder="article-title-slug" />
          </div>

          <ImageUpload name="image_url" label="Thumbnail Image" defaultValue={item.image_url} />

           <div className="admin-form__group">
            <label className="admin-form__label">Excerpt</label>
            <textarea name="excerpt" defaultValue={item.excerpt} className="admin-form__textarea" style={{minHeight: '80px'}} placeholder="Short summary..." />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Content (HTML/Markdown)</label>
            <textarea name="content" defaultValue={item.content} className="admin-form__textarea" style={{minHeight: '300px'}} placeholder="Article content..." />
          </div>

           <div className="admin-form__group">
            <label className="admin-form__label">Published Date</label>
            <input name="published_date" type="datetime-local" defaultValue={dateValue} className="admin-form__input" />
          </div>

          <div className="admin-form__group flex items-center gap-2">
            <input name="published" type="checkbox" id="published" defaultChecked={item.published} />
            <label htmlFor="published" className="cursor-pointer">Publish immediately</label>
          </div>

          <button type="submit" disabled={loading} className="admin-btn admin-btn--primary">
            {loading ? "Saving..." : "Update Article"}
          </button>
        </form>
      </div>
    </div>
  );
}
