import { NextRequest, NextResponse } from 'next/server';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const Bucket = process.env.AWS_S3_BUCKET!;
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

// // 이미지 불러오기
// export async function GET(req: Request, res: Response) {
//   try {
//     const { Key } = req.query;
//     const data = await s3.send(
//       new GetObjectCommand({
//         Bucket,
//         Key,
//       }),
//     );

//     const Body = await new Uint8Array(await data.Body.arrayBuffer());
//   } catch (error) {
//     return Response.error();
//   }
// }

// 이미지 저장
export async function POST(req: NextRequest, res: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string;

    if (!file || !folder) {
      return NextResponse.json(
        { error: 'File or folder missing' },
        { status: 400 },
      );
    }

    const buffer = await file.arrayBuffer();
    const fileName = `${Date.now()}-${file.name}`;
    const fullPath = `${folder.replace(/^\/+|\/+$/g, '')}/${fileName}`.replace(
      /^\/+/,
      '',
    );

    const params: PutObjectCommandInput = {
      Bucket,
      Key: fullPath,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    };

    // 이미지 저장
    await s3.send(new PutObjectCommand(params));

    // 객체 URL 생성
    const objectUrl = `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fullPath}`;

    return NextResponse.json({ imageUrl: objectUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
}

// // 이미지 삭제
// export async function DELETE(req: Request, res: Response) {
//   try {
//     const { Key } = req.json();
//     await s3.send(
//       new DeleteObjectCommand({
//         Bucket,
//         Key,
//       }),
//     );

//     return Response.json({ message: 'OK' });
//   } catch (error) {
//     return Response.error();
//   }
// }
