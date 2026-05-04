"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BookCard from "@/components/BookCard";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  available_quantity: number;
  image_url: string;
}

export default function BookCarousel({ books }: { books: Book[] }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
      className="pb-12"
    >
      {books.map((book) => (
        <SwiperSlide key={book.id}>
          <BookCard book={book} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
