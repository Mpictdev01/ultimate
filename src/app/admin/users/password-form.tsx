"use client";

import { useState } from "react";
import { updateUserPassword } from "../actions";

export default function PasswordForm({ userId, userName }: { userId: string, userName: string }) {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) return;
        
        setLoading(true);
        setMessage(null);

        const result = await updateUserPassword(userId, password);

        if (result.success) {
            setMessage({ type: 'success', text: 'Password updated successfully' });
            setPassword("");
        } else {
            setMessage({ type: 'error', text: result.error || 'Failed to update password' });
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleUpdate} className="flex gap-2 items-center mt-2">
            <input 
                type="password" 
                placeholder={`New password for ${userName}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
                required
                minLength={6}
            />
            <button 
                type="submit" 
                disabled={loading}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Saving..." : "Change"}
            </button>
            {message && (
                <span className={`text-xs ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {message.text}
                </span>
            )}
        </form>
    );
}
