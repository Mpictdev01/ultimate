import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimoni | Ultimate Autoshop Semarang",
  description: "Lihat testimoni pelanggan Ultimate Autoshop Semarang. Rating 5 bintang di Google Reviews.",
};

export default async function TestimoniPage() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from("testimoni")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  return (
    <>
      {/* Header */}
      <div className="archive-grid">
        <div className="archive-title">
          <h1>Testimoni</h1>
        </div>
        <div className="text-center" style={{ marginBottom: "30px" }}>
          <a
            href="https://maps.app.goo.gl/hQoRy71nMUxXfdo29"
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            <i className="fab fa-google"></i>
            Lihat Semua di Google
          </a>
        </div>
      </div>

      {/* Testimonial Grid */}
      <section className="layout" style={{ paddingTop: 0 }}>
        <div className="h-grid">
          <div className="large-12">
            <div className="projects-tile testimoni-grid">
              {/* Rating Image */}
              <div className="project rating-card" style={{ gridColumn: "span 3" }}>
                <Image
                  src="/images/testimoni/rate.png"
                  alt="Rating"
                  width={800}
                  height={200}
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
              </div>
              
              {/* Testimonial Screenshots */}
              {testimonials?.map((item) => (
                <div key={item.id} className="project testimoni-item">
                  {item.image_url && (item.image_url.startsWith('/') || item.image_url.startsWith('http')) ? (
                      <Image
                        src={item.image_url}
                        alt="Testimoni"
                        width={300}
                        height={300}
                        style={{ 
                          width: "100%", 
                          height: "auto",
                          aspectRatio: "1",
                          objectFit: "contain",
                          background: "#f5f5f5"
                        }}
                      />
                  ) : null}
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href="https://maps.app.goo.gl/hQoRy71nMUxXfdo29"
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                <i className="fab fa-google"></i>
                Lihat Semua di Google
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
