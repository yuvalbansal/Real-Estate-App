import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { email, password, accountType } = await req.json();
    const filePath = path.join(process.cwd(), 'auth.json');

    const fileData = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf-8')
      : '[]';

    const users = JSON.parse(fileData);

    const user = users.find(
      (u: any) =>
        u.Email === email &&
        u.Password === password &&
        u['Account Type'] === accountType
    );

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: 'Logged In', user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
