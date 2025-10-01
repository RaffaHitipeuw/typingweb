import { connectToDatabase } from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

const COLLECTION_NAME = 'scores';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const scores = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ wpm: -1, timestamp: 1 }) 
      .limit(100) 
      .toArray();

    return NextResponse.json(scores);
  } catch (error) {
    console.error("Database GET Error:", error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch scores' }), { status: 500 });
  }
}


export async function POST(req) {
  try {
    const { wpm, accuracy, username } = await req.json();

    if (typeof wpm !== 'number' || wpm <= 0 || !username) {
      return new NextResponse(JSON.stringify({ error: 'Invalid score or missing username' }), { status: 400 });
    }

    const { db } = await connectToDatabase();
    
    const newScore = {
      username: username, 
      wpm: Math.round(wpm),
      accuracy: Math.round(accuracy),
      timestamp: new Date(),
    };

    const result = await db.collection(COLLECTION_NAME).insertOne(newScore);

    return NextResponse.json({ 
        message: 'Score saved successfully', 
        id: result.insertedId,
        score: newScore
    }, { status: 201 });
  } catch (error) {
    console.error("Database POST Error:", error);
    return new NextResponse(JSON.stringify({ error: 'Failed to save score' }), { status: 500 });
  }
}