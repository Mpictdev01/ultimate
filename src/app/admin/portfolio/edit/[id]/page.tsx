import { createClient } from "@/lib/supabase/server";
import EditPortfolioForm from "./form";

export default async function EditPortfolio({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: item } = await supabase.from("portfolio").select("*").eq("id", id).single();

  if (!item) {
    return <div>Portfolio item not found</div>;
  }

  return (
      <EditPortfolioForm item={item} />
  );
}
