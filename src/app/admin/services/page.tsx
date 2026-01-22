import { createClient } from "@/lib/supabase/server";
import { deleteService } from "../actions";
import DeleteButton from "@/components/admin/DeleteButton";
import Link from "next/link";

export default async function AdminServices() {
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("*").order("sort_order");

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Manage Services</h1>
        <Link href="/admin/services/create" className="admin-btn admin-btn--primary">
          <i className="fas fa-plus"></i> Add New Service
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
            {(services && services.length > 0) ? (
              services.map((service) => (
                <tr key={service.id}>
                  <td data-label="Title">{service.title}</td>
                  <td data-label="Description">{service.description?.substring(0, 50)}...</td>
                  <td data-label="Status">
                    <span className={`px-2 py-1 rounded text-xs ${service.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {service.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="flex gap-2" data-label="Actions">
                    <Link href={`/admin/services/edit/${service.id}`} className="admin-btn admin-btn--secondary admin-btn--sm">
                        <i className="fas fa-edit"></i>
                    </Link>
                    <DeleteButton 
                        id={service.id} 
                        deleteAction={deleteService} 
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">No services found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
