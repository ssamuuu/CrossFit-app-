import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';

export async function POST(req: Request) {
  try {
    const { userId, exercise, weight, date } = await req.json();
    
    const db = await connectDB();

    await db.execute(
      'INSERT INTO personal_records (user_id, exercise, weight, date) VALUES (?, ?, ?, ?)',
      [userId, exercise, weight, date]
    );

    await db.end();
    return NextResponse.json({ message: 'PR saved successfully' });

  } catch (error) {
    console.error('Error saving PR:', error);
    return NextResponse.json(
      { message: 'Failed to save PR' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    const db = await connectDB();

    const [records] = await db.execute(
      'SELECT * FROM personal_records WHERE user_id = ? ORDER BY date ASC',
      [userId]
    );

    await db.end();
    return NextResponse.json(records);

  } catch (error) {
    console.error('Error fetching PRs:', error);
    return NextResponse.json(
      { message: 'Failed to fetch PRs' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const prId = searchParams.get('id');
    const userId = searchParams.get('userId');

    if (!prId || !userId) {
      return NextResponse.json(
        { message: 'PR ID and User ID are required' },
        { status: 400 }
      );
    }

    const db = await connectDB();

    // Verify the PR belongs to the user before deleting
    await db.execute(
      'DELETE FROM personal_records WHERE id = ? AND user_id = ?',
      [prId, userId]
    );

    await db.end();
    return NextResponse.json({ message: 'PR deleted successfully' });

  } catch (error) {
    console.error('Error deleting PR:', error);
    return NextResponse.json(
      { message: 'Failed to delete PR' },
      { status: 500 }
    );
  }
}