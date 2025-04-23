import { connectMongoose } from "@/lib/db";
import Image from "@/models/Image";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongoose();

    // Get images excluding target info in descending order
    const imgs = await Image.find().sort({ createdAt: -1 }).select('-targets');

    if (!imgs || imgs.length === 0) {

      return NextResponse.json({
        status: 'error',
        message: 'No games found',
      }, { status: 404 });

    } else {

      return NextResponse.json({
        status: 'success',
        imgs
      }, { status: 200 });
    }

  } catch (err) {
    // Return error response
    return NextResponse.json({
      status: 'error',
      message: err.message
    }, { status: 500 });
  }
}