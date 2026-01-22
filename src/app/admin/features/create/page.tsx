"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFeature } from "../../actions";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

export default function CreateFeature() {
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
      icon_url: formData.get("icon_url"),
      active: formData.get("active") === "on",
      sort_order: Number(formData.get("sort_order") || 0),
    };

    const result = await createFeature(data);

    if (result.success) {
      router.push("/admin/features");
    } else {
      setError(result.error || "Failed to create feature");
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Add New Feature</h1>
        <Link href="/admin/features" className="admin-btn admin-btn--secondary">
          Back
        </Link>
      </div>

      <div className="admin-card">
        {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form__group">
            <label className="admin-form__label">Title</label>
            <input name="title" required className="admin-form__input" placeholder="Feature Title" />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Title</label>
            <input name="title" required className="admin-form__input" placeholder="Feature Title" />
          </div>

          <ImageUpload name="icon_url" label="Icon URL (or FontAwesome Class / Image)" />

          <div className="admin-form__group">
            <label className="admin-form__label">Description</label>
            <textarea name="description" className="admin-form__textarea" placeholder="Feature Description" />
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Sort Order</label>
            <input name="sort_order" type="number" defaultValue={0} className="admin-form__input" />
          </div>

          <div className="admin-form__group flex items-center gap-2">
            <input name="active" type="checkbox" id="active" defaultChecked />
            <label htmlFor="active" className="cursor-pointer">Active</label>
          </div>

          <button type="submit" disabled={loading} className="admin-btn admin-btn--primary">
            {loading ? "Saving..." : "Save Feature"}
          </button>
        </form>
      </div>
    </div>
  );
}
