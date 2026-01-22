import { createClient } from "@/lib/supabase/server";
import { deleteArticle } from "../actions";
import DeleteButton from "@/components/admin/DeleteButton";
import Link from "next/link";

export default async function AdminArticles() {
  const supabase = await createClient();
  const { data: articles } = await supabase.from("articles").select("*").order("published_date", { ascending: false });

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Manage Articles</h1>
        <Link href="/admin/articles/create" className="admin-btn admin-btn--primary">
          <i className="fas fa-plus"></i> Write Article
        </Link>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(articles && articles.length > 0) ? (
                articles.map((article) => (
                  <tr key={article.id}>
                    <td data-label="Title">{article.title}</td>
                    <td data-label="Slug">{article.slug}</td>
                    <td data-label="Date">{article.published_date ? new Date(article.published_date).toLocaleDateString() : "-"}</td>
                    <td data-label="Status">
                      <span className={`px-2 py-1 rounded text-xs ${article.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {article.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="flex gap-2" data-label="Actions">
                      <Link href={`/admin/articles/edit/${article.id}`} className="admin-btn admin-btn--secondary admin-btn--sm">
                          <i className="fas fa-edit"></i>
                      </Link>
                      <DeleteButton 
                          id={article.id} 
                          deleteAction={deleteArticle} 
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">No articles found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
