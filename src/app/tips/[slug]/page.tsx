import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin"; // Use admin client for static params (no cookies needed)
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// Optional: Enable SSG for existing articles
export async function generateStaticParams() {
  const supabase = createAdminClient();
  const { data: articles } = await supabase.from("articles").select("slug");
  return (articles || []).map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase.from("articles").select("*").eq("slug", slug).single();
  
  if (!article) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  return {
    title: `${article.title} | Ultimate Autoshop Semarang`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase.from("articles").select("*").eq("slug", slug).single();

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <div className="archive-grid">
        <div className="archive-title">
          <h1>{article.title}</h1>
        </div>
        <div className="post-meta" style={{ marginBottom: "30px" }}>
          Ditulis pada tanggal <time>{new Date(article.published_date).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</time>
        </div>
      </div>

      {/* Article Content */}
      <section className="free-layout layout" style={{ paddingTop: 0 }}>
        <div className="h-grid">
          <article className="free-column article-content" style={{ textAlign: "left", maxWidth: "800px" }}>
            {article.image_url && (article.image_url.startsWith('/') || article.image_url.startsWith('http')) ? (
                <Image
                src={article.image_url}
                alt={article.title}
                width={800}
                height={400}
                style={{ width: "100%", height: "auto", borderRadius: "8px", marginBottom: "30px" }}
                />
            ) : null}
            
            {/* Render Content */}
            <div className="article-body">
                {article.content ? (
                    <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
                ) : (
                    <p>{article.excerpt}</p>
                )}
            </div>

            <p style={{ marginBottom: "30px", marginTop: "30px" }}>
              Hubungi kami untuk konsultasi gratis dan demo produk!
            </p>
            <div className="text-center">
              <a
                href="https://wa.me/6289513301689"
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                <i className="fab fa-whatsapp"></i>
                Hubungi Kami via WhatsApp
              </a>
            </div>
            <div style={{ marginTop: "30px" }}>
              <Link href="/tips" className="button" style={{ background: "#666" }}>
                ← Kembali ke Tips
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
