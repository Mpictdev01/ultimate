import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tips | Ultimate Autoshop Semarang",
  description: "Blog tips modifikasi lampu mobil, tren lampu BiLED, dan solusi pencahayaan mobil.",
};

export default async function TipsPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("published_date", { ascending: false });

  return (
    <>
      {/* Header */}
      <div className="archive-grid">
        <div className="archive-title">
          <h1>Tips</h1>
        </div>
      </div>

      {/* Articles List */}
      <section className="layout" style={{ paddingTop: 0 }}>
        {articles?.map((article) => (
          <article key={article.slug} className="post-tease">
            <figure>
              {article.image_url && (article.image_url.startsWith('/') || article.image_url.startsWith('http')) ? (
                <Image
                    src={article.image_url}
                    alt={article.title}
                    width={250}
                    height={180}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                 // Fallback or empty if URL is invalid (e.g. random string)
                 article.image_url && <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 text-xs">{article.image_url ? "No Image" : ""}</div>
              )}
            </figure>
            <div className="tease-body">
              <Link href={`/tips/${article.slug}`}>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </Link>
              <div className="post-meta">
                Ditulis pada tanggal <time>{new Date(article.published_date).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</time>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
