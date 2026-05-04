"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/SessionProvider";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { ArrowLeft, User, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { user, loading } = useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    if (user) {
      setName(user.name);
      setImage(user.image || "");
    }
  }, [user, loading, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const { data, error } = await authClient.updateUser({
        name,
        image: image || undefined,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully!");
      router.push("/profile");
      router.refresh();
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/profile" className="btn btn-ghost gap-2 mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Profile
      </Link>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl font-bold mb-6">
            Update Information
          </h1>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
                <input
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered w-full pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Profile Image URL</span>
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full pl-10"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={updating}
            >
              {updating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Information"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
