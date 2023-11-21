'use client';

import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { Room } from '../types/db';
import { useUserId } from '../lib/composables/useUserId';
import { useSupabase } from '../lib/composables/useSupabase';
import Button from '../components/Button';

export default function Home() {
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const router = useRouter();
  const userId = useUserId();

  const supabase = useSupabase();

  const createRoom = async () => {
    try {
      setIsCreatingRoom(() => true);

      const { data, error }: PostgrestSingleResponse<Room[]> = await supabase
        .from('room')
        .insert({
          user_id: userId,
        })
        .select();

      if (error) {
        console.error(error);
        return;
      }

      const room = data ? data[0] : null;

      if (!room) {
        return;
      }

      router.push(`/rooms/${room.id}`);
    } finally {
      setIsCreatingRoom(() => false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-blue-900 text-white leading-snug p-3">
      <section className="w-full max-w-[300px] mt-16">
        <Button
          onClick={createRoom}
          className="block w-full"
          disabled={isCreatingRoom}
        >
          <span className="flex justify-center items-center gap-3 text-2xl font-bold">
            {
              isCreatingRoom && (
                <FaSpinner className="animate-spin" />
              )
            }
            Create a room
          </span>
        </Button>
      </section>
    </main>
  );
}
