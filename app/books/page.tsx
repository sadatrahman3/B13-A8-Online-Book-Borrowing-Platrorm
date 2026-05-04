"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import books from "@/data/books.json";
import BookCard from "@/components/BookCard";
import { Search } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  available_quantity: number;
  image_url: string;
}

function BooksContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "All"
  );
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

  const categories = ["All", "Story", "Tech", "Science"];

  useEffect(() => {
    let filtered = books;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [searchQuery, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category !== "All") {
      router.push(`/books?category=${category}`, { scroll: false });
    } else {
      router.push("/books", { scroll: false });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Category Sidebar */}
      <aside className="lg:w-64 flex-shrink-0">
        <div className="bg-base-200 rounded-lg p-6 sticky top-24">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryChange(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-content"
                      : "hover:bg-base-300"
                  }`}
                >
                  {category}
                  <span className="float-right text-sm opacity-70">
                    ({category === "All" ? books.length : books.filter(b => b.category === category).length})
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Books Grid */}
      <div className="flex-grow">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
            <input
              type="text"
              placeholder="Search books by title..."
              className="input input-bordered w-full pl-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm opacity-70 mb-4">
          Showing {filteredBooks.length} of {books.length} books
        </p>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl opacity-70">No books found</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="btn btn-primary mt-4"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AllBooksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        All Books
      </h1>
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <BooksContent />
      </Suspense>
    </div>
  );
}
