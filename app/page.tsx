import Link from "next/link";
import books from "@/data/books.json";
import BookCard from "@/components/BookCard";
import BookCarousel from "@/components/BookCarousel";

export default function Home() {
  const featuredBooks = books.slice(0, 4);
  const newArrivals = books.slice(4, 8);

  return (
    <div>
      {/* Banner Section */}
      <section className="hero-gradient min-h-[60vh] flex items-center justify-center text-white">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Next Read
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Discover thousands of books waiting to be borrowed from our digital library
          </p>
          <Link href="/books" className="btn btn-secondary btn-lg">
            Browse Now
          </Link>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-primary text-primary-content py-3 overflow-hidden">
        <div className="whitespace-nowrap marquee-text">
          <span className="text-sm font-medium">
            📚 New Arrivals: The Pragmatic Programmer | 1984 | Cosmos | Special Discount on Memberships... 
            | 📖 Featured: The Midnight Library | Clean Code | The Great Gatsby | 
            Join BookNest Today and Get 30% Off Your First Borrow! 🎉
          </span>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* New Arrivals Carousel Section */}
      <section className="bg-base-200 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">New Arrivals</h2>
          <BookCarousel books={newArrivals} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/books?category=Story" className="group">
            <div className="card bg-gradient-to-br from-purple-500 to-pink-500 text-white h-48 justify-center items-center transition-transform group-hover:scale-105">
              <h3 className="text-2xl font-bold">📖 Story</h3>
              <p className="opacity-80 mt-2">Fiction & Literature</p>
            </div>
          </Link>
          <Link href="/books?category=Tech" className="group">
            <div className="card bg-gradient-to-br from-blue-500 to-cyan-500 text-white h-48 justify-center items-center transition-transform group-hover:scale-105">
              <h3 className="text-2xl font-bold">💻 Tech</h3>
              <p className="opacity-80 mt-2">Programming & Technology</p>
            </div>
          </Link>
          <Link href="/books?category=Science" className="group">
            <div className="card bg-gradient-to-br from-green-500 to-emerald-500 text-white h-48 justify-center items-center transition-transform group-hover:scale-105">
              <h3 className="text-2xl font-bold">🔬 Science</h3>
              <p className="opacity-80 mt-2">Scientific Discoveries</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-base-200 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">BookNest by Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="stat bg-base-100 shadow-lg rounded-box">
              <div className="stat-title">Total Books</div>
              <div className="stat-value text-primary">{books.length}</div>
              <div className="stat-desc">And growing</div>
            </div>
            <div className="stat bg-base-100 shadow-lg rounded-box">
              <div className="stat-title">Categories</div>
              <div className="stat-value text-secondary">3</div>
              <div className="stat-desc">Story, Tech, Science</div>
            </div>
            <div className="stat bg-base-100 shadow-lg rounded-box">
              <div className="stat-title">Available Copies</div>
              <div className="stat-value text-accent">
                {books.reduce((sum, book) => sum + book.available_quantity, 0)}
              </div>
              <div className="stat-desc">Ready to borrow</div>
            </div>
            <div className="stat bg-base-100 shadow-lg rounded-box">
              <div className="stat-title">Happy Readers</div>
              <div className="stat-value">500+</div>
              <div className="stat-desc">Active members</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
