import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { fullname, email, username, password } = await req.json();

    // Connect to database
    const db = await connectDB();

    // Check if user already exists
    const [existingUsers] = await db.execute(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db.execute(
      'INSERT INTO users (fullname, email, username, password) VALUES (?, ?, ?, ?)',
      [fullname, email, username, hashedPassword]
    );

    await db.end();

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error registering user' },
      { status: 500 }
    );
  }
}