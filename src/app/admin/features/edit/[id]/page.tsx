import { createClient } from "@/lib/supabase/server";
import EditFeatureForm from "./form";

export default async function EditFeature({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: item } = await supabase.from("features").select("*").eq("id", id).single();

  if (!item) {
    return <div>Feature not found</div>;
  }

  return (
      <EditFeatureForm item={item} />
  );
}
