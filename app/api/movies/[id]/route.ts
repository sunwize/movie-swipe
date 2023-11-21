import { tmdb } from '../../../../lib/services/tmdb';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  id: string
}

export const GET = async (request: NextRequest, { params: { id } }: { params: Params }) => {
  try {
    const { data } = await tmdb.get(`/movie/${id}`);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json([]);
  }
};
