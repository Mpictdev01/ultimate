import { createClient } from "@/lib/supabase/server";
import EditGalleryForm from "./form";

export default async function EditGallery({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: item } = await supabase.from("profile_gallery").select("*").eq("id", id).single();

  if (!item) {
    return <div>Gallery item not found</div>;
  }

  return (
      <EditGalleryForm item={item} />
  );
}
