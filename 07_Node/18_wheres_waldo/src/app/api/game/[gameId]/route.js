import { NextResponse, NextRequest } from 'next/server';
 
export async function GET(req, { params }) {
  const urlParams = (await params);
  const { gameId } = urlParams;
 
  return NextResponse.json({ gameId, name: `Game ${gameId}` },
    { status:200},);
}