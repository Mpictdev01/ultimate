import { createClient } from "@/lib/supabase/server";
import EditServiceForm from "./form";

export default async function EditService({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: item } = await supabase.from("services").select("*").eq("id", id).single();

  if (!item) {
    return <div>Service not found</div>;
  }

  return (
      <EditServiceForm item={item} />
  );
}
