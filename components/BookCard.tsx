import Link from "next/link";
import Image from "next/image";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  available_quantity: number;
  image_url: string;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <figure className="relative h-64 w-full">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          className="object-cover rounded-t-xl"
        />
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title text-lg">{book.title}</h3>
        <p className="text-sm opacity-70">by {book.author}</p>
        <div className="badge badge-primary badge-sm">{book.category}</div>
        <div className="card-actions mt-4">
          <Link href={`/books/${book.id}`} className="btn btn-primary btn-block btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
