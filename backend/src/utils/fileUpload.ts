import fs from 'fs';
import path from 'path';
import cloudinary from '../config/cloudinary';

const uploadsDir = path.join(process.cwd(), 'uploads');

const uploadToCloudinary = (buffer: Buffer): Promise<string> =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error('Cloudinary upload failed'));
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });

const saveLocally = (buffer: Buffer, originalName: string): string => {
  fs.mkdirSync(uploadsDir, { recursive: true });
  const safeName = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  fs.writeFileSync(path.join(uploadsDir, safeName), buffer);
  const port = process.env.PORT || '5000';
  const host = process.env.PUBLIC_API_URL || `http://localhost:${port}`;
  return `${host.replace(/\/$/, '')}/uploads/${safeName}`;
};

/**
 * Stores an uploaded file to Cloudinary when configured, otherwise saves locally
 * and returns a URL the backend can serve for Gemini processing.
 */
export const storeUploadedFile = async (
  buffer: Buffer,
  originalName: string
): Promise<string> => {
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    return uploadToCloudinary(buffer);
  }
  console.log('[Upload] Cloudinary not configured — saving file locally');
  return saveLocally(buffer, originalName);
};

export const isCloudinaryConfigured = (): boolean =>
  Boolean(process.env.CLOUDINARY_CLOUD_NAME);
