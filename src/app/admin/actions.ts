"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

// --- SETTINGS ---
export async function updateSiteSettings(settings: { id: string; value: string }[]) {
  const supabase = createAdminClient();

  try {
    const updates = settings.map((item) =>
      supabase
        .from("site_settings")
        .update({ value: item.value, updated_at: new Date().toISOString() })
        .eq("id", item.id)
    );

    await Promise.all(updates);
    revalidatePath("/admin/settings");
    revalidatePath("/", "layout"); // Revalidate entire site as settings might affect header/footer
    return { success: true };
  } catch (error: any) {
    console.error("Update Settings Error:", error);
    return { success: false, error: error.message };
  }
}

// --- FEATURES ---
export async function createFeature(data: any) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("features").insert([data]);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/features");
  revalidatePath("/", "layout");
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateFeature(id: string, data: any) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("features").update({ ...data, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/features");
  revalidatePath("/", "layout");
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteFeature(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("features").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/features");
  revalidatePath("/", "layout");
  revalidatePath("/", "layout");
  return { success: true };
}

// --- SERVICES ---
export async function createService(data: any) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("services").insert([data]);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateService(id: string, data: any) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("services").update({ ...data, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteService(id: string) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/services");
  revalidatePath("/", "layout");
    return { success: true };
}

// --- PORTFOLIO ---
export async function createPortfolio(data: any) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("portfolio").insert([data]);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/portfolio");
  revalidatePath("/", "layout");
    return { success: true };
}

export async function updatePortfolio(id: string, data: any) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("portfolio").update({ ...data, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/portfolio");
  revalidatePath("/", "layout");
    return { success: true };
}

export async function deletePortfolio(id: string) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("portfolio").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/portfolio");
  revalidatePath("/", "layout");
    return { success: true };
}

// --- ARTICLES ---
export async function createArticle(data: any) {
    const supabase = createAdminClient();
    // Generate slug from title if not provided
    if (!data.slug && data.title) {
        data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const { error } = await supabase.from("articles").insert([data]);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/articles");
  revalidatePath("/", "layout");
    return { success: true };
}

export async function updateArticle(id: string, data: any) {
    const supabase = createAdminClient();
    if (data.title && !data.slug) {
         // Optionally update slug? Let's keep existing slug logic or let user edit it manually?
         // For now, let's just update as is.
    }
    const { error } = await supabase.from("articles").update({ ...data, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/articles");
  revalidatePath("/", "layout");
    return { success: true };
}

export async function deleteArticle(id: string) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/articles");
  revalidatePath("/", "layout");
    return { success: true };
}

// --- TESTIMONI ---
export async function createTestimoni(data: any) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("testimoni").insert([data]);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/testimoni");
  revalidatePath("/", "layout");
    return { success: true };
}

export async function updateTestimoni(id: string, data: any) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("testimoni").update({ ...data, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/testimoni");
  revalidatePath("/", "layout");
    return { success: true };
}

export async function deleteTestimoni(id: string) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("testimoni").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/testimoni");
  revalidatePath("/", "layout");
    return { success: true };
}

// --- GALLERY ---
export async function createGalleryItem(data: any) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("profile_gallery").insert([data]);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/gallery");
  revalidatePath("/", "layout");
    return { success: true };
}

export async function updateGalleryItem(id: string, data: any) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("profile_gallery").update({ ...data, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/gallery");
  revalidatePath("/", "layout");
    return { success: true };
}

export async function deleteGalleryItem(id: string) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("profile_gallery").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/gallery");
  revalidatePath("/", "layout");
    return { success: true };
}

// --- USERS ---
export async function updateUserPassword(id: string, password: string) {
    const supabase = createAdminClient();
    const bcrypt = require('bcryptjs'); 
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { error } = await supabase.from("admin_users").update({ password_hash: hashedPassword, updated_at: new Date().toISOString() }).eq("id", id);
        
        if (error) return { success: false, error: error.message };
        
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
