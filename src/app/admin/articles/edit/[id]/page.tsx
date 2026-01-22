import { createClient } from "@/lib/supabase/server";
import EditArticleForm from "./form";

export default async function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: item } = await supabase.from("articles").select("*").eq("id", id).single();

  if (!item) {
    return <div>Article not found</div>;
  }

  return (
      <EditArticleForm item={item} />
  );
}
