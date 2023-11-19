import { NextRequest, NextResponse } from 'next/server.js';
import { tmdb } from '../../../../lib/services/tmdb';

export const GET = async () => {
  try {
    const { data } = await tmdb.get('/movie/popular');
    return NextResponse.json(data.results);
  } catch (err) {
    console.error(err);
    return NextResponse.json([]);
  }
};
