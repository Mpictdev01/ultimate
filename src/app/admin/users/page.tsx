import { createClient } from "@/lib/supabase/server";
import PasswordForm from "./password-form";

export default async function AdminUsers() {
  const supabase = await createClient();
  const { data: users } = await supabase.from("admin_users").select("*").order("name");

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>User Management</h1>
        <p>Manage admin access and passwords</p>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
            <table className="admin-table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Change Password</th>
                </tr>
            </thead>
            <tbody>
                {(users && users.length > 0) ? (
                users.map((user) => (
                    <tr key={user.id}>
                    <td data-label="Name" className="font-medium">{user.name}</td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="Role">
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded border border-gray-200">
                            {user.role}
                        </span>
                    </td>
                    <td data-label="Change Password">
                        <PasswordForm userId={user.id} userName={user.name} />
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={4} className="text-center py-4">No users found.</td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
