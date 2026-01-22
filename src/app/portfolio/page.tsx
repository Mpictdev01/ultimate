import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Ultimate Autoshop Semarang",
  description: "Lihat hasil modifikasi lampu mobil kami. Berbagai merek: Toyota, Honda, Mitsubishi, BMW, Mercedes-Benz dan lainnya.",
};

export default async function PortfolioPage() {
  const supabase = await createClient();
  const { data: portfolioItems } = await supabase
    .from("portfolio")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  return (
    <>
      {/* Header */}
      <div className="archive-grid">
        <div className="archive-title">
          <h1>Portfolio</h1>
        </div>
        <div className="text-center" style={{ marginBottom: "30px" }}>
          <a
            href="https://www.instagram.com/ultimateautoshopsemarang"
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            <i className="fab fa-instagram"></i>
            Lihat Semua di Instagram
          </a>
        </div>
      </div>

      {/* Portfolio Grid */}
      <section className="layout" style={{ paddingTop: 0 }}>
        <div className="h-grid">
          <div className="large-12">
            <div className="projects-tile">
              {portfolioItems?.map((item) => (
                <div key={item.id} className="project">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={400}
                    height={200}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href="https://www.instagram.com/ultimateautoshopsemarang"
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                <i className="fab fa-instagram"></i>
                Lihat Semua di Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
