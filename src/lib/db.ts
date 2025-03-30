import mysql from 'mysql2/promise';

export async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'uusi',
      password: 'vaihdettusalis99',
      database: 'register'  // Changed from 'cros' to 'register'
    });

    // Test the connection
    await connection.execute('SELECT 1');

    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database');
  }
}