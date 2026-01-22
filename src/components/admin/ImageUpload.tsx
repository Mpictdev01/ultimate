"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Use client for upload (via RLS or public policy if allowed, or we use a signed URL approach. Actually for simplicity, we'll try direct upload if policy allows, otherwise we might need a server action wrapper. But standard is client upload.)
// Wait, if I use Service Role I can bypass RLS on server. But on client I am 'anon'.
// I enabled 'Public' bucket, so reading is fine. Writing usually requires Auth.
// Since we don't have full Auth UI with users, I might need to upload via Server Action OR enable Public Insert (insecure).
// SECURE WAY: Upload via Server Action or API Route.
// Let's make an API route for upload: /api/upload

import Image from "next/image";

interface ImageUploadProps {
  defaultValue?: string;
  name: string;
  label?: string;
}

export default function ImageUpload({ defaultValue, name, label = "Image" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await res.json();
      setPreview(data.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-form__group">
      <label className="admin-form__label">{label}</label>
      
      <div className="flex flex-col gap-4">
        {/* Hidden input to store URL for the parent form */}
        <input type="hidden" name={name} value={preview || ""} />
        
        {preview ? (
          <div className="relative w-full h-48 bg-gray-100 rounded overflow-hidden border border-gray-200">
             {/* Use img for simplicity in admin or specific Next Image with remote patterns */}
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={preview} alt="Preview" className="w-full h-full object-contain" />
             <button 
               type="button"
               onClick={() => setPreview(null)}
               className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700"
             >
               <i className="fas fa-times"></i>
             </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded p-8 text-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors">
             <i className="fas fa-cloud-upload-alt text-3xl mb-2"></i>
             <p className="text-sm">Click or drag image to upload</p>
             <input 
               type="file" 
               accept="image/*"
               onChange={handleFileChange}
               className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
               title="Upload Image"
             />
          </div>
        )}
        
        {uploading && <p className="text-sm text-blue-600 animate-pulse">Uploading...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
