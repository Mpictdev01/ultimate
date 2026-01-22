import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { 
  features, 
  services, 
  portfolioItems, 
  articles, 
  testimoniImages, 
  profilImages, 
  siteConfig 
} from "@/lib/data";

export async function GET() {
  const supabase = createAdminClient();
  const results = {
    features: "skipped",
    services: "skipped",
    portfolio: "skipped",
    articles: "skipped",
    testimoni: "skipped",
    gallery: "skipped",
    settings: "skipped"
  };

  try {
    // 1. Site Settings
    const settingsData = [
      { key: "site_title", value: siteConfig.title },
      { key: "site_description", value: siteConfig.description },
      { key: "phone", value: siteConfig.phone },
      { key: "whatsapp", value: siteConfig.whatsapp },
      { key: "address", value: siteConfig.address },
      { key: "maps_url", value: siteConfig.mapsUrl },
      { key: "instagram", value: siteConfig.social.instagram },
      { key: "youtube", value: siteConfig.social.youtube },
      { key: "tiktok", value: siteConfig.social.tiktok },
      { key: "facebook", value: siteConfig.social.facebook },
      { key: "tokopedia", value: siteConfig.social.tokopedia },
    ];
    // Check if settings exist, simple approach: delete all and re-insert or upsert
    // Let's upsert based on key.
    const { error: settingsError } = await supabase.from("site_settings").upsert(
      settingsData.map(s => ({ ...s, type: "text" })), // Add default type
      { onConflict: "key" }
    );
    results.settings = settingsError ? `Error: ${settingsError.message}` : "Success";


    // 2. Features
    // Clear existing? No, maybe check if empty.
    const { count: featuresCount } = await supabase.from("features").select("*", { count: "exact", head: true });
    if (featuresCount === 0) {
       const featuresData = features.map((f, i) => ({
         title: f.title,
         description: f.description,
         icon_url: f.icon,
         sort_order: i,
         active: true
       }));
       const { error } = await supabase.from("features").insert(featuresData);
       results.features = error ? `Error: ${error.message}` : "Inserted";
    }

    // 3. Services
    const { count: servicesCount } = await supabase.from("services").select("*", { count: "exact", head: true });
    if (servicesCount === 0) {
      const servicesData = services.map((s, i) => ({
        title: s.title,
        description: s.description,
        icon_url: s.icon,
        sort_order: i,
        active: true
      }));
       const { error } = await supabase.from("services").insert(servicesData);
       results.services = error ? `Error: ${error.message}` : "Inserted";
    }

    // 4. Portfolio
    const { count: portfolioCount } = await supabase.from("portfolio").select("*", { count: "exact", head: true });
    if (portfolioCount === 0) {
      const portfolioData = portfolioItems.map((p, i) => ({
        title: p.title,
        description: p.desc,
        image_url: p.image,
        sort_order: i,
        active: true,
        featured: i < 6 // Make first 6 featured
      }));
       const { error } = await supabase.from("portfolio").insert(portfolioData);
       results.portfolio = error ? `Error: ${error.message}` : "Inserted";
    }

    // 5. Articles
     const { count: articlesCount } = await supabase.from("articles").select("*", { count: "exact", head: true });
    if (articlesCount === 0) {
      const articlesData = articles.map((a) => ({
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        content: a.excerpt, // Use excerpt as content for now
        image_url: a.image,
        published_date: new Date().toISOString(), // Or parse Indonesian date string if crucial
        published: true
      }));
       const { error } = await supabase.from("articles").insert(articlesData);
       results.articles = error ? `Error: ${error.message}` : "Inserted";
    }

    // 6. Testimoni
    const { count: testimoniCount } = await supabase.from("testimoni").select("*", { count: "exact", head: true });
    if (testimoniCount === 0) {
      const testimoniData = testimoniImages.map((img, i) => ({
        image_url: img,
        sort_order: i,
        active: true
      }));
       const { error } = await supabase.from("testimoni").insert(testimoniData);
       results.testimoni = error ? `Error: ${error.message}` : "Inserted";
    }

     // 7. Gallery
    const { count: galleryCount } = await supabase.from("profile_gallery").select("*", { count: "exact", head: true });
    if (galleryCount === 0) {
      const galleryData = profilImages.map((img, i) => ({
        image_url: img,
        sort_order: i,
        active: true,
        alt_text: "Gallery Image"
      }));
       const { error } = await supabase.from("profile_gallery").insert(galleryData);
       results.gallery = error ? `Error: ${error.message}` : "Inserted";
    }
    
    return NextResponse.json({ success: true, results });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
