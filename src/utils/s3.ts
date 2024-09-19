import {
  CopyObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';

export const Bucket = process.env.AWS_S3_BUCKET!;
export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const moveImages = async (
  id: string,
  content: string,
  usedImages: string[],
): Promise<string> => {
  try {
    let updatedContent = content;

    for (const imageUrl of usedImages) {
      const oldKey = imageUrl.split('posts/temporary/').pop() as string;
      const newKey = `posts/${id}/${oldKey}`;

      await s3.send(
        new CopyObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          CopySource: `${process.env.AWS_S3_BUCKET}/posts/temporary/${oldKey}`,
          Key: newKey,
        }),
      );

      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: `posts/temporary/${oldKey}`,
        }),
      );

      const newUrl = imageUrl.replace('temporary', id);
      updatedContent = updatedContent.replace(imageUrl, newUrl);
    }
    return updatedContent;
  } catch (error) {
    return content;
  }
};

export const cleanupTempImages = async (): Promise<void> => {
  const listParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Prefix: 'temporary/',
  };

  try {
    const data = await s3.send(new ListObjectsV2Command(listParams));
    if (data.Contents) {
      for (const object of data.Contents) {
        if (object.Key) {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.AWS_S3_BUCKET,
              Key: object.Key,
            }),
          );
        }
      }
    }
  } catch (error) {
    throw new Error('Failed to cleanup temporary images');
  }
};
