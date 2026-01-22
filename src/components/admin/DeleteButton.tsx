"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ 
  id, 
  deleteAction 
}: { 
  id: string; 
  deleteAction: (id: string) => Promise<{ success: boolean; error?: string }>;
}) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setDeleting(true);
    try {
        const result = await deleteAction(id);
        if (!result.success) {
            alert("Failed to delete: " + result.error);
        } else {
            router.refresh();
        }
    } catch (err: any) {
        alert("Error: " + err.message);
    } finally {
        setDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={deleting}
      className="admin-btn admin-btn--danger admin-btn--sm"
    >
      <i className={`fas ${deleting ? "fa-spinner fa-spin" : "fa-trash"}`}></i>
    </button>
  );
}
