"use client";

import "@/app/admin/admin.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: "fa-home", label: "Dashboard", href: "/admin" },
    { icon: "fa-cog", label: "Example Settings", href: "/admin/settings" },
    { icon: "fa-project-diagram", label: "Portfolio", href: "/admin/portfolio" },
    { icon: "fa-newspaper", label: "Articles", href: "/admin/articles" },
    { icon: "fa-star", label: "Testimoni", href: "/admin/testimoni" },
    { icon: "fa-images", label: "Gallery", href: "/admin/gallery" },
    { icon: "fa-tools", label: "Services", href: "/admin/services" },
    { icon: "fa-list", label: "Features", href: "/admin/features" },
    { icon: "fa-users", label: "Users", href: "/admin/users" },
  ];

  // If on login page, render children directly without dashboard layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout">
      {/* Mobile Toggle */}
      <button 
        className="admin-toggle-btn" 
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'} fa-lg`}></i>
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar__header">
          <Link href="/" target="_blank" className="flex flex-col items-center hover:opacity-80 transition-opacity">
             <div className="relative w-16 h-16 mb-2 bg-white rounded-full p-2 flex items-center justify-center shadow-lg">
               <img 
                 src="/images/logo2.png" 
                 alt="Ultimate Autoshop" 
                 className="w-full h-full object-contain"
               />
             </div>
             <h2 className="admin-brand">ULTIMATE <span className="text-red-500">ADMIN</span></h2>
          </Link>
        </div>
        
        <nav className="admin-sidebar__nav">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-sidebar__link ${pathname === item.href ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)} // Close on navigate (mobile)
            >
              <i className={`fas ${item.icon}`}></i>
              {item.label}
            </Link>
          ))}

          <div className="admin-sidebar__divider"></div>

          <Link href="/" target="_blank" className="admin-sidebar__link">
            <i className="fas fa-external-link-alt"></i>
            Visit Website
          </Link>
        </nav>

        <div className="admin-sidebar__logout">
          <form action="/api/auth/logout" method="post">
            <button type="submit">
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        {/* Overlay for mobile to close sidebar */}
        {sidebarOpen && (
            <div 
                className="fixed inset-0 bg-black/50 z-[90] md:hidden"
                onClick={() => setSidebarOpen(false)}
            ></div>
        )}
        {children}
      </main>
    </div>
  );
}
