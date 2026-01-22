import { createClient } from "@/lib/supabase/server";
import EditTestimoniForm from "./form";

export default async function EditTestimoni({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: item } = await supabase.from("testimoni").select("*").eq("id", id).single();

  if (!item) {
    return <div>Testimonial not found</div>;
  }

  return (
      <EditTestimoniForm item={item} />
  );
}
