import { createClient } from "@/lib/supabase/server";
import { deleteFeature } from "../actions";
import DeleteButton from "@/components/admin/DeleteButton";
import Link from "next/link";

export default async function AdminFeatures() {
  const supabase = await createClient();
  const { data: features } = await supabase.from("features").select("*").order("sort_order");

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Manage Features</h1>
        <Link href="/admin/features/create" className="admin-btn admin-btn--primary">
          <i className="fas fa-plus"></i> Add Feature
        </Link>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(features && features.length > 0) ? (
              features.map((feature) => (
                <tr key={feature.id}>
                  <td data-label="Title">{feature.title}</td>
                  <td data-label="Description">{feature.description}</td>
                  <td data-label="Status">
                    <span className={`px-2 py-1 rounded text-xs ${feature.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {feature.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="flex gap-2" data-label="Actions">
                    <Link href={`/admin/features/edit/${feature.id}`} className="admin-btn admin-btn--secondary admin-btn--sm">
                        <i className="fas fa-edit"></i>
                    </Link>
                    <DeleteButton 
                        id={feature.id} 
                        deleteAction={deleteFeature} 
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">No features found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
