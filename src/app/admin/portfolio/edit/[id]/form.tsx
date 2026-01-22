"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePortfolio } from "../../../actions";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditPortfolioForm({ item }: { item: any }) {
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
      description: formData.get("description"),
      image_url: formData.get("image_url"),
      active: formData.get("active") === "on",
      featured: formData.get("featured") === "on",
      sort_order: Number(formData.get("sort_order") || 0),
    };

    const result = await updatePortfolio(item.id, data);

    if (result.success) {
      router.push("/admin/portfolio");
    } else {
      setError(result.error || "Failed to update portfolio item");
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Edit Portfolio Item</h1>
        <Link href="/admin/portfolio" className="admin-btn admin-btn--secondary">
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
            <input name="title" required defaultValue={item.title} className="admin-form__input" placeholder="Project Title" />
          </div>

          <ImageUpload name="image_url" label="Portfolio Image" defaultValue={item.image_url} />

          <div className="admin-form__group">
            <label className="admin-form__label">Description</label>
            <textarea name="description" defaultValue={item.description} className="admin-form__textarea" placeholder="Project Description" />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Sort Order</label>
            <input name="sort_order" type="number" defaultValue={item.sort_order} className="admin-form__input" />
          </div>

          <div className="flex gap-6">
            <div className="admin-form__group flex items-center gap-2">
                <input name="active" type="checkbox" id="active" defaultChecked={item.active} />
                <label htmlFor="active" className="cursor-pointer">Active</label>
            </div>
            <div className="admin-form__group flex items-center gap-2">
                <input name="featured" type="checkbox" id="featured" defaultChecked={item.featured} />
                <label htmlFor="featured" className="cursor-pointer">Featured (Show on Home)</label>
            </div>
          </div>

          <button type="submit" disabled={loading} className="admin-btn admin-btn--primary">
            {loading ? "Saving..." : "Update Portfolio Item"}
          </button>
        </form>
      </div>
    </div>
  );
}
