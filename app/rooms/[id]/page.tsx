'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '../../../lib/services/api';
import MovieTile from '../../../components/MovieTile';
import { useParams, useRouter } from 'next/navigation';
import { useSupabase } from '../../../lib/composables/useSupabase';
import { useUserId } from '../../../lib/composables/useUserId';
import { PostgrestMaybeSingleResponse } from '@supabase/supabase-js';
import { Room, RoomMovie } from '../../../types/db';
import Button from '../../../components/Button';

export default function Invitation() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [likedMovieIds, setLikedMovieIds] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [movieMatched, setMovieMatched] = useState<Movie|null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { id: roomId } = useParams<{ id: string }>();
  const userId = useUserId();
  const supabase = useSupabase();

  const channel = supabase.channel(roomId);

  const movie = useMemo(() => movies[index], [movies, index]);

  const getPopularMovies = async () => {
    const { data } = await api.get<Movie[]>('/api/movies/popular');
    return data;
  };

  const getSimilarMovies = async (movieId: number) => {
    const { data } = await api.get<Movie[]>(`/api/movies/similar/${movieId}`);
    return data;
  };

  const getMovie = async (movieId: number) => {
    const { data } = await api.get<Movie>(`/api/movies/${movieId}`);
    return data;
  };

  const getRoom = async () => {
    const { data, error }: PostgrestMaybeSingleResponse<Room> = await supabase
      .from('room')
      .select('*')
      .eq('id', roomId)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  };

  const addMovieToRoom = async () => {
    const { data, error }: PostgrestMaybeSingleResponse<RoomMovie> = await supabase
      .from('room_movies')
      .select('*')
      .eq('room_id', roomId)
      .eq('movie_id', movie.id)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      if (data.user_id === userId) {
        return;
      } else {
        await channel.send({
          type: 'broadcast',
          event: 'match',
          payload: {
            movieId: movie.id,
          },
        });
      }
    }

    const { error: insertError } = await supabase
      .from('room_movies')
      .insert({
        room_id: roomId,
        movie_id: movie.id,
        user_id: userId,
      });

    if (insertError) {
      console.error(insertError);
    }
  };

  const onThumbUp = async () => {
    try {
      setIsLoading(() => true);
      await addMovieToRoom();

      const data = await getSimilarMovies(movie.id);
      const movieHistoryIds = movies.map((movie) => movie.id);
      const moviesToAdd = data.filter((movie) => !movieHistoryIds.includes(movie.id));
      setMovies((value) => [...value, ...moviesToAdd]);

      setLikedMovieIds((ids) => [...ids, movie.id]);
      setIndex((value) => value + 1);
    } finally {
      setIsLoading(() => false);
    }
  };

  const onThumbDown = () => {
    setIndex((value) => value + 1);
  };

  const sendInvite = async () => {
    try {
      await navigator.share({
        url: `${window.origin}/rooms/${roomId}`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    channel.on(
      'broadcast',
      { event: 'match' },
      async ({ payload }) => {
        if (movieMatched) {
          return;
        }

        const movie = await getMovie(payload.movieId);
        setMovieMatched(movie);
      })
      .subscribe();

    (async () => {
      const room = await getRoom();

      if (!room) {
        router.push('/');
      }

      const results = await getPopularMovies();
      setMovies(results);
    })();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-blue-900 text-white leading-snug p-3">
      {
        !movieMatched ? (
          <section className="w-full pt-6">
            <div className="flex justify-center mb-6">
              <Button onClick={sendInvite}>
                <span className="font-bold text-2xl">
                  Send invite
                </span>
              </Button>
            </div>
            <div className="flex justify-center w-full">
              {
                movie && (
                  <MovieTile
                    key={movie.id}
                    movie={movie}
                    disabled={isLoading}
                    onThumbUp={onThumbUp}
                    onThumbDown={onThumbDown}
                    className="w-full max-w-[400px]"
                  />
                )
              }
            </div>
          </section>
        ) : (
          <section className="w-full flex flex-col items-center gap-6 pt-6">
            <p className="text-3xl font-bold uppercase">{'It\'s a match!'}</p>
            <MovieTile
              movie={movieMatched}
              showThumbs={false}
              className="w-full max-w-[400px]"
            />
            <Button
              onClick={() => router.push('/')}
              className="mt-4"
            >
              <span className="text-2xl font-bold">Start over</span>
            </Button>
          </section>
        )
      }
    </main>
  );
}
