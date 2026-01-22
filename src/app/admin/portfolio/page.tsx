import { createClient } from "@/lib/supabase/server";
import { deletePortfolio } from "../actions";
import DeleteButton from "@/components/admin/DeleteButton";
import Link from "next/link";

export default async function AdminPortfolio() {
  const supabase = await createClient();
  const { data: items } = await supabase.from("portfolio").select("*").order("sort_order");

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Manage Portfolio</h1>
        <Link href="/admin/portfolio/create" className="admin-btn admin-btn--primary">
          <i className="fas fa-plus"></i> Add Portfolio Item
        </Link>
      </div>

      <div className="admin-grid">
        {(items && items.length > 0) ? (
          items.map((item) => (
            <div key={item.id} className="admin-grid-item">
               {item.image_url && (item.image_url.startsWith('/') || item.image_url.startsWith('http')) ? (
                  <img src={item.image_url} alt={item.title} className="admin-grid-image" />
               ) : (
                  <div className="admin-grid-image flex items-center justify-center text-gray-400 bg-gray-100">No Image</div>
               )}
               <div className="admin-grid-content">
                  <h3 className="admin-grid-title">{item.title}</h3>
                  <div className="admin-grid-desc">{item.description}</div>
                  <div className="admin-grid-actions">
                      <span className={`text-xs px-2 py-1 rounded ${item.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.active ? 'Active' : 'Draft'}
                      </span>
                      <div className="flex gap-2">
                        <Link href={`/admin/portfolio/edit/${item.id}`} className="admin-btn admin-btn--secondary admin-btn--sm">
                            <i className="fas fa-edit"></i> Edit
                        </Link>
                        <DeleteButton 
                            id={item.id} 
                            deleteAction={deletePortfolio} 
                        />
                      </div>
                  </div>
               </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-4 admin-card">
            <p>No portfolio items found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
