"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/components/SessionProvider";
import books from "@/data/books.json";
import Image from "next/image";
import toast from "react-hot-toast";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useSession();
  const book = books.find((b) => b.id === params.id);

  if (!book) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Book Not Found</h1>
          <Link href="/books" className="btn btn-primary">
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  const handleBorrow = () => {
    if (!user) {
      toast.error("Please login to borrow books");
      router.push("/login");
      return;
    }

    if (book.available_quantity <= 0) {
      toast.error("Sorry, this book is currently unavailable");
      return;
    }

    toast.success(`You have borrowed "${book.title}" successfully!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/books" className="btn btn-ghost gap-2 mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Books
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Book Cover */}
        <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={book.image_url}
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Book Details */}
        <div className="flex flex-col justify-center">
          <div className="badge badge-primary mb-4">{book.category}</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg opacity-70 mb-4">by {book.author}</p>
          <p className="text-base-content/80 mb-6 leading-relaxed">{book.description}</p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-medium">Available:</span>
              <span
                className={`font-bold ${
                  book.available_quantity > 0 ? "text-success" : "text-error"
                }`}
              >
                {book.available_quantity} copies left
              </span>
            </div>
          </div>

          <button
            onClick={handleBorrow}
            className={`btn btn-lg ${
              book.available_quantity > 0
                ? "btn-primary"
                : "btn-disabled"
            }`}
          >
            {book.available_quantity > 0
              ? "Borrow This Book"
              : "Currently Unavailable"}
          </button>

          {!user && (
            <p className="text-sm opacity-60 mt-4">
              You need to{" "}
              <Link href="/login" className="text-primary hover:underline">
                login
              </Link>{" "}
              to borrow books
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
