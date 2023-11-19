import Image from 'next/image';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { useState } from 'react';

interface Props {
  movie: Movie
  className?: string
  onThumbUp: () => void
  onThumbDown: () => void
}

export default function MovieTile({ movie, onThumbUp, onThumbDown, className }: Props) {
  const [isOverviewVisible, setIsOverviewVisible] = useState(false);
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';

  return (
    <article className={`relative aspect-[2/3] ${className}`}>
      <div
        onClick={() => setIsOverviewVisible((value) => !value)}
        className="relative aspect-[2/3] bg-black rounded-md overflow-hidden shadow-md"
      >
        <Image src={posterUrl} alt={movie.title} fill={true} priority={true} style={{ objectFit: 'cover' }} />
        {
          isOverviewVisible && (
            <p className="absolute top-0 left-0 w-full h-full bg-black/70 backdrop-blur-lg font-medium text-lg p-3">{movie.overview}</p>
          )
        }
      </div>
      <p title={movie.title} className="truncate text-xl font-medium my-3">{movie.title}</p>
      <div className="grid grid-cols-2 gap-1 text-white font-medium text-xl mt-1">
        <button
          onClick={onThumbDown}
          className="col-span-1 bg-red-600 rounded-md border border-2 border-red-600 hover:border-white shadow-md flex justify-center py-4"
        >
          <FaThumbsDown />
        </button>
        <button
          onClick={onThumbUp}
          className="col-span-1 bg-green-600 rounded-md border border-2 border-green-600 hover:border-white shadow-md flex justify-center py-4"
        >
          <FaThumbsUp />
        </button>
      </div>
    </article>
  );
}
