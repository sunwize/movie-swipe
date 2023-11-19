import { NextRequest, NextResponse } from 'next/server.js';
import { tmdb } from '../../../../../lib/services/tmdb';

interface Params {
  id: string
}

export const GET = async (request: NextRequest, { params: { id } }: { params: Params }) => {
  try {
    const { data } = await tmdb.get(`/movie/${id}/recommendations`);
    return NextResponse.json(data.results);
  } catch (err) {
    console.error(err);
    return NextResponse.json([]);
  }
};
