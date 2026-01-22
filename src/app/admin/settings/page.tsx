"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  type: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .order("key");

    if (error) {
      console.error("Error fetching settings:", error);
      setMessage({ text: "Gagal mengambil data settings.", type: "error" });
    } else {
      setSettings(data || []);
    }
    setLoading(false);
  };

  const handleInputChange = (id: string, newValue: string) => {
    setSettings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      // Import the server action (dynamically or at top level, top level preferred but for inline replacement:
      // We need to import it at the top level. I will do a full file replace to ensure imports are correct)
      const { updateSiteSettings } = await import("../actions");
      
      const updates = settings.map(s => ({ id: s.id, value: s.value }));
      const result = await updateSiteSettings(updates);

      if (result.success) {
        setMessage({ text: "Settings berhasil disimpan!", type: "success" });
      } else {
        setMessage({ text: `Gagal menyimpan: ${result.error}`, type: "error" });
      }
    } catch (error: any) {
      console.error("Error saving settings:", error);
      setMessage({ text: `Gagal menyimpan settings: ${error.message || error}`, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <p className="text-center py-8">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Site Settings</h1>
        <button 
            className="admin-btn admin-btn--primary" 
            onClick={handleSave}
            disabled={saving}
        >
          <i className={`fas ${saving ? "fa-spinner fa-spin" : "fa-save"}`}></i> 
          {saving ? " Saving..." : " Save Changes"}
        </button>
      </div>

      {message && (
        <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="admin-card">
        <div className="space-y-4">
          {settings.length > 0 ? (
            settings.map((setting) => (
              <div key={setting.id} className="admin-form__group">
                <label className="admin-form__label capitalize">
                  {setting.key.replace(/_/g, " ")}
                </label>
                {setting.type === "textarea" ? (
                  <textarea
                    className="admin-form__textarea"
                    value={setting.value || ""}
                    onChange={(e) => handleInputChange(setting.id, e.target.value)}
                  />
                ) : (
                  <input
                    type={setting.type || "text"}
                    className="admin-form__input"
                    value={setting.value || ""}
                    onChange={(e) => handleInputChange(setting.id, e.target.value)}
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-gray-500">
              No settings found. Please add data to the <code>site_settings</code> table in Supabase.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
