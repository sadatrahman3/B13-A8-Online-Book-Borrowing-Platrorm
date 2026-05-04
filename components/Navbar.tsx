"use client";

import Link from "next/link";
import { useSession } from "@/components/SessionProvider";
import { BookOpen, User, LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useSession();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
  };

  return (
    <nav className="navbar bg-base-100 shadow-lg sticky top-0 z-50 px-4 lg:px-8">
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <BookOpen className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-primary">BookNest</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link href="/" className="font-medium hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/books" className="font-medium hover:text-primary transition-colors">
              All Books
            </Link>
          </li>
          {user && (
            <li>
              <Link href="/profile" className="font-medium hover:text-primary transition-colors">
                My Profile
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-medium">{user.name}</span>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error btn-sm gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm gap-2">
            <User className="w-4 h-4" />
            Login
          </Link>
        )}

        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-2">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/books">All Books</Link></li>
            {user && <li><Link href="/profile">My Profile</Link></li>}
            {!user && <li><Link href="/login">Login</Link></li>}
            {user && (
              <li>
                <button onClick={handleLogout} className="text-error">Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
