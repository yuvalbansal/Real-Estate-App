import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { name, email, password, accountType } = await req.json();
    const filePath = path.join(process.cwd(), 'auth.json');

    const fileData = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf-8')
      : '[]';

    const users = JSON.parse(fileData);

    const existingUser = users.find(
      (user: any) =>
        user.Email === email && user['Account Type'] === accountType
    );

    if (existingUser) {
      let type;
      if (accountType === 'buyer') type = 'Buyer';
      else if (accountType === 'individual') type = 'Individual Owner';
      else if (accountType === 'builder') type = 'Builder/Colonizer';

      return NextResponse.json(
        { message: `${type} account already exists with the given email` },
        { status: 400 }
      );
    }

    // Generate a unique six-digit ID
    let newId;
    const existingIds = new Set(users.map((u: any) => u.ID));
    do {
      newId = Math.floor(100000 + Math.random() * 900000);
    } while (existingIds.has(newId));

    const newUser = {
      ID: newId,
      Name: name,
      Email: email,
      Password: password,
      'Account Type': accountType,
    };

    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'Account created!' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Error writing to file' },
      { status: 500 }
    );
  }
}
