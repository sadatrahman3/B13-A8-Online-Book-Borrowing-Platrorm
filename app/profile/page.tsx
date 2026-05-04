"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/SessionProvider";
import Image from "next/image";
import { User, Mail, Edit, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useSession();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-start mb-6">
            <h1 className="card-title text-3xl font-bold">My Profile</h1>
            <Link href="/profile/update" className="btn btn-primary gap-2">
              <Edit className="w-4 h-4" />
              Update Information
            </Link>
          </div>

          <div className="divider"></div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <div className="avatar">
              <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={128}
                    height={128}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-neutral text-neutral-content flex items-center justify-center">
                    <User className="w-16 h-16" />
                  </div>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-grow space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm opacity-70">Name</p>
                  <p className="font-medium text-lg">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm opacity-70">Email</p>
                  <p className="font-medium text-lg">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-primary">📚</div>
                <div>
                  <p className="text-sm opacity-70">Member Since</p>
                  <p className="font-medium text-lg">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
