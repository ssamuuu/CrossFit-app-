import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    
    const db = await connectDB();

    // Get user from database
    const [users] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    const user = (users as any[])[0];

    if (!user) {
      await db.end();
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      await db.end();
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }

    await db.end();
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        fullname: user.fullname
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Login failed' },
      { status: 500 }
    );
  }
}