import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/* const DIR_PATH = path.resolve(`/app/uploads`);
if (!fs.existsSync(DIR_PATH)) {
  fs.mkdirSync(DIR_PATH, { recursive: true });
} */

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file)
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    if (!(file instanceof Blob)) {
      return NextResponse.json(
        { error: 'Invalid file format' },
        { status: 400 }
      );
    }

    const filename = file.name;
    const fileType = file.type;
    const fileSize = file.size;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.resolve('/uploads', filename);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json(
      {
        success: true,
        filename,
        fileType,
        fileSize,
        filePath,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      {
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
