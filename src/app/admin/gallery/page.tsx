import { createClient } from "@/lib/supabase/server";
import { deleteGalleryItem } from "../actions";
import DeleteButton from "@/components/admin/DeleteButton";
import Link from "next/link";

export default async function AdminGallery() {
  const supabase = await createClient();
  const { data: gallery } = await supabase.from("profile_gallery").select("*").order("sort_order");

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Manage Profile Gallery</h1>
        <Link href="/admin/gallery/create" className="admin-btn admin-btn--primary">
          <i className="fas fa-plus"></i> Add Image
        </Link>
      </div>

      <div className="admin-grid">
        {(gallery && gallery.length > 0) ? (
          gallery.map((item) => (
            <div key={item.id} className="admin-grid-item">
               {item.image_url && (item.image_url.startsWith('/') || item.image_url.startsWith('http')) ? (
                  <img src={item.image_url} alt={item.alt_text} className="admin-grid-image" />
               ) : (
                  <div className="admin-grid-image flex items-center justify-center text-gray-400 bg-gray-100">No Image</div>
               )}
               <div className="admin-grid-content">
                  <div className="admin-grid-desc" style={{ WebkitLineClamp: 1 }}>{item.alt_text || "No description"}</div>
                  <div className="admin-grid-actions">
                      <span className={`text-xs px-2 py-1 rounded ${item.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.active ? 'Active' : 'Draft'}
                      </span>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mr-auto ml-2">
                        <i className="fas fa-sort"></i> {item.sort_order}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/admin/gallery/edit/${item.id}`} className="admin-btn admin-btn--secondary admin-btn--sm">
                            <i className="fas fa-edit"></i>
                        </Link>
                        <DeleteButton 
                            id={item.id} 
                            deleteAction={deleteGalleryItem} 
                        />
                      </div>
                  </div>
               </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-4 admin-card">
            <p>No gallery images found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
