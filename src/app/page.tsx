import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  // Fetch Features
  const { data: features } = await supabase
    .from("features")
    .select("*")
    .eq("active", true)
    .order("sort_order");

  // Fetch Services
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("sort_order");

  // Fetch Portfolio Preview (limit 3)
  const { data: portfolioPreview } = await supabase
    .from("portfolio")
    .select("*")
    .eq("active", true)
    .eq("featured", true) // Assuming we use 'featured' flag or just limit
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <>
      {/* Hero Section */}
      <section className="layout cover-layout">
        <div className="cover-layout__gallery">
          <Image
            src="/images/coveru.jpg"
            alt="Ultimate Autoshop Cover"
            width={900}
            height={450}
            priority
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
          />
        </div>
        <div className="cover-layout__video-column">
          <figure className="cover-layout__video">
            <video autoPlay loop muted playsInline>
              <source src="/video/baner.mp4" type="video/mp4" />
            </video>
          </figure>
        </div>
      </section>

      {/* Features Section */}
      <section className="layout features-layout">
        <ul className="features-layout__items">
          {features?.map((feature, index) => (
            <li key={feature.id} className="features-layout__item">
              {feature.icon_url && (
                 feature.icon_url.startsWith('/') || feature.icon_url.startsWith('http') ? (
                    <Image
                        src={feature.icon_url}
                        alt={feature.title}
                        width={80}
                        height={80}
                    />
                 ) : (
                    // Fallback for FA icons if stored as text
                    <i className={`${feature.icon_url} text-4xl mb-4 text-red-600`}></i>
                 )
              )}
              <dd>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </dd>
            </li>
          ))}
        </ul>
      </section>

      {/* Portfolio Preview Section */}
      <section className="layout projects-layout">
        <div className="h-grid projects-layout__heading">
          <div className="large-9">
            <h2 className="section-title">Portfolio</h2>
          </div>
        </div>
        <div className="h-grid">
          <div className="large-12">
            <div className="projects-tile">
              {portfolioPreview?.map((item) => (
                <div key={item.id} className="project">
                  {item.image_url && (item.image_url.startsWith('/') || item.image_url.startsWith('http')) ? (
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        width={400}
                        height={200}
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                  ) : (
                      <div className="bg-gray-200 h-[200px] w-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/portfolio" className="button">
                Lihat Semua Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="layout types-layout">
        <div className="h-grid">
          <div className="large-12">
            <article className="type-content">
              <h2 className="section-title">Jasa Ultimate</h2>
              <dl className="services-list">
                {services?.map((service) => (
                  <div key={service.id} className="service-item">
                    <dt>
                      {service.icon_url && (
                        (service.icon_url.startsWith('/') || service.icon_url.startsWith('http')) ? (
                            <Image
                                src={service.icon_url}
                                alt={service.title}
                                width={150}
                                height={100}
                                style={{ borderRadius: "8px" }}
                            />
                        ) : (
                             // Fallback for FA icons if stored as text
                             <i className={`${service.icon_url} text-4xl text-red-600 mb-2 block`}></i>
                        )
                      )}
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
