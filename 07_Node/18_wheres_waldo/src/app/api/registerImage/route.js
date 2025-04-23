
import { connectMongoose } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import Image from "@/models/Image";

export async function POST(request) {
    try {
        // Parse request body
        const body = await request.json();
        const { url, width, height } = body;

        await connectMongoose();

        // Create and save new image
        const img = new Image({
            url: url,
            width: width,
            height: height,
        })
        await img.save();
        
        // Return success response
        return NextResponse.json({
            status: 'success', 
            message: 'registered new image'
        }, { status: 200 });
        
    } catch (error) {
        console.error("Error registering new image:", error);
        
        // Return error response
        return NextResponse.json({
            status: 'error',
            message: error.message
        }, { status: 500 });
    }
}