import { createClient } from "@/lib/supabase/server";
import { deleteTestimoni } from "../actions";
import DeleteButton from "@/components/admin/DeleteButton";
import Link from "next/link";

export default async function AdminTestimoni() {
  const supabase = await createClient();
  const { data: testimoni } = await supabase.from("testimoni").select("*").order("sort_order");

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Manage Testimonials</h1>
        <Link href="/admin/testimoni/create" className="admin-btn admin-btn--primary">
          <i className="fas fa-plus"></i> Add Testimonial
        </Link>
      </div>

      <div className="admin-grid">
        {(testimoni && testimoni.length > 0) ? (
          testimoni.map((item) => (
            <div key={item.id} className="admin-grid-item testimoni">
               {item.image_url && (item.image_url.startsWith('/') || item.image_url.startsWith('http')) ? (
                  <img src={item.image_url} alt="Testimoni" className="admin-grid-image" />
               ) : (
                  <div className="admin-grid-image flex items-center justify-center text-gray-400 bg-gray-100">No Image</div>
               )}
               <div className="admin-grid-content">
                  <h3 className="admin-grid-title">Testimonial #{item.sort_order}</h3>
                  <div className="admin-grid-actions">
                      <span className={`text-xs px-2 py-1 rounded ${item.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.active ? 'Active' : 'Draft'}
                      </span>
                      <div className="flex gap-2">
                        <Link href={`/admin/testimoni/edit/${item.id}`} className="admin-btn admin-btn--secondary admin-btn--sm">
                            <i className="fas fa-edit"></i> Edit
                        </Link>
                        <DeleteButton 
                            id={item.id} 
                            deleteAction={deleteTestimoni} 
                        />
                      </div>
                  </div>
               </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-4 admin-card">
            <p>No testimonials found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
