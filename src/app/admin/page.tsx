import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Get counts from database
  const [
    { count: portfolioCount },
    { count: articlesCount },
    { count: testimoniCount },
    { count: servicesCount },
  ] = await Promise.all([
    supabase.from("portfolio").select("*", { count: "exact", head: true }),
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase.from("testimoni").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }),
  ]);

  return (
    <>
      <header className="admin-header">
        <h1>Dashboard</h1>
        <p>Selamat datang di Admin Panel Ultimate Autoshop</p>
      </header>

      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__icon admin-stat__icon--red">
            <i className="fas fa-images"></i>
          </div>
          <div className="admin-stat__value">{portfolioCount || 0}</div>
          <div className="admin-stat__label">Portfolio Items</div>
        </div>

        <div className="admin-stat">
          <div className="admin-stat__icon admin-stat__icon--blue">
            <i className="fas fa-newspaper"></i>
          </div>
          <div className="admin-stat__value">{articlesCount || 0}</div>
          <div className="admin-stat__label">Articles</div>
        </div>

        <div className="admin-stat">
          <div className="admin-stat__icon admin-stat__icon--green">
            <i className="fas fa-comment-dots"></i>
          </div>
          <div className="admin-stat__value">{testimoniCount || 0}</div>
          <div className="admin-stat__label">Testimoni</div>
        </div>

        <div className="admin-stat">
          <div className="admin-stat__icon admin-stat__icon--yellow">
            <i className="fas fa-tools"></i>
          </div>
          <div className="admin-stat__value">{servicesCount || 0}</div>
          <div className="admin-stat__label">Services</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h2>Quick Actions</h2>
        </div>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <a href="/admin/portfolio" className="admin-btn admin-btn--primary">
            <i className="fas fa-plus"></i> Add Portfolio
          </a>
          <a href="/admin/articles" className="admin-btn admin-btn--primary">
            <i className="fas fa-plus"></i> Add Article
          </a>
          <a href="/admin/testimoni" className="admin-btn admin-btn--primary">
            <i className="fas fa-plus"></i> Add Testimoni
          </a>
          <a href="/admin/settings" className="admin-btn admin-btn--secondary">
            <i className="fas fa-cog"></i> Site Settings
          </a>
        </div>
      </div>

    </>
  );
}
