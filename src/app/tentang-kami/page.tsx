import { createClient } from "@/lib/supabase/server";
import { profilImages } from "@/lib/data";
import type { Metadata } from "next";
import ImageSlider from "@/components/ImageSlider";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tentang Kami | Ultimate Autoshop Semarang",
  description: "Ultimate Autoshop telah berdiri sejak tahun 2012 dengan spesialisasi kepada modifikasi lampu mobil. Kami sudah melayani puluhan ribu mobil.",
};

export default async function TentangKamiPage() {
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("*").eq("active", true).order("sort_order");

  return (
    <>
      {/* Banner */}
      <section className="banner-layout layout">
        <div className="banner" style={{ 
          backgroundImage: "url('/images/profil/pc.png')",
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} />
      </section>

      {/* About Content */}
      <section className="free-layout layout">
        <div className="h-grid">
          <div className="large-1"></div>
          <article className="free-column">
            <h1>Tentang <strong>Ultimate</strong> Autoshop</h1>
            <p>
              Ultimate Autoshop telah berdiri sejak tahun 2012 dengan spesialisasi kepada modifikasi lampu mobil. 
              Sejauh ini kami sudah melayani puluhan ribu mobil yang digunakan ribuan keluarga muda dengan berbagai 
              produk penerangan, mulai dari era lampu HID dan termasuk pioneer dalam bidang projector HID. 
              Terus berinovasi dan mengikuti perkembangan jaman yang mana saat ini lampu LED dan BIled Projector 
              menjadi lebih populer dengan terus memastikan produk yang kami gunakan memiliki ketahanan maksimal 
              untuk kebutuhan fungsional konsumen
            </p>
          </article>
        </div>
      </section>

      {/* Profile Gallery - Slider for all devices */}
      <section className="layout">
        <ImageSlider images={profilImages} alt="Ultimate Autoshop Workshop" />
      </section>

      {/* Services Section */}
      <section className="layout types-layout">
        <div className="h-grid">
          <div className="large-12">
            <article className="type-content">
              <h1 className="section-title">
                <strong>Jasa Ultimate</strong>
              </h1>
              <dl className="services-list">
                {(services || []).map((service: any, index: number) => (
                  <div key={service.id || index} className="service-item">
                    <dt>
                      <Image
                        src={service.icon_url || service.icon} // Fallback support if using different field names temporarily
                        alt={service.title}
                        width={80}
                        height={80}
                        style={{ borderRadius: "8px", objectFit: "cover" }}
                      />
                    </dt>
                    <dd>
                      <h4>{service.title} »</h4>
                      <p>{service.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
