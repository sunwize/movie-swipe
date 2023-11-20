'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '../../../lib/services/api';
import MovieTile from '../../../components/MovieTile';
import logo from '../../../lib/assets/images/logo.png';
import Image from 'next/image';

export default function Invitation() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [likedMovieIds, setLikedMovieIds] = useState<number[]>([]);
  const [index, setIndex] = useState(0);

  const movie = useMemo(() => movies[index], [movies, index]);

  const getPopularMovies = async () => {
    const { data } = await api.get<Movie[]>('/api/movies/popular');
    return data;
  };

  const getSimilarMovies = async (movieId: number) => {
    const { data } = await api.get<Movie[]>(`/api/movies/similar/${movieId}`);
    return data;
  };

  const onThumbUp = () => {
    getSimilarMovies(movie.id)
      .then((data) => {
        const movieHistoryIds = movies.map((movie) => movie.id);
        const moviesToAdd = data.filter((movie) => !movieHistoryIds.includes(movie.id));
        setMovies((value) => [...value, ...moviesToAdd]);
      });
    setLikedMovieIds((ids) => [...ids, movie.id]);
    setIndex((value) => value + 1);
  };

  const onThumbDown = () => {
    setIndex((value) => value + 1);
  };

  useEffect(() => {
    (async () => {
      const results = await getPopularMovies();
      setMovies(results);
    })();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-blue-900 text-white leading-snug p-3">
      <section className="w-full">
        <div className="relative w-[100px] aspect-square mx-auto mb-16">
          <Image src={logo} alt="logo" fill={true} style={{ objectFit: 'contain' }} />
        </div>
        <div className="flex justify-center w-full">
          {
            movie && (
              <MovieTile
                key={movie.id}
                movie={movie}
                className="w-full max-w-[400px]"
                onThumbUp={onThumbUp}
                onThumbDown={onThumbDown}
              />
            )
          }
        </div>
      </section>
    </main>
  );
}
