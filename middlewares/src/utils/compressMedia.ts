import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

// Ensure ffmpeg is installed on your system and available in PATH
// For Windows, you may need to set the path to the ffmpeg executable
ffmpeg.setFfmpegPath('/path/to/ffmpeg'); // Adjust this if ffmpeg is not in your PATH

// Convert an image to WebP format
export const compressImageToWebP = async (inputPath: string, outputPath: string): Promise<void> => {
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Image converted and saved to ${outputPath}`);
  } catch (error) {
    console.error('Error converting image to WebP:', error);
    throw error;
  }
};

// Convert a video to WebP format
export const compressVideoToWebP = async (inputPath: string, outputPath: string): Promise<void> => {
  try {
    await new Promise<void>((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions('-vcodec', 'libwebp')
        .outputOptions('-lossless', '0')
        .outputOptions('-q:v', '50')
        .outputOptions('-loop', '0')
        .outputOptions('-preset', 'default')
        .outputOptions('-an')
        .output(outputPath)
        .on('end', () => {
          console.log(`Video converted and saved to ${outputPath}`);
          resolve();
        })
        .on('error', (error) => {
          console.error('Error converting video to WebP:', error);
          reject(error);
        })
        .run();
    });
  } catch (error) {
    console.error('Error converting video to WebP:', error);
    throw error;
  }
};

// Example usage
(async () => {
  try {
    const imageInputPath = path.join(__dirname, 'example.jpg');
    const imageOutputPath = path.join(__dirname, 'example.webp');
    await compressImageToWebP(imageInputPath, imageOutputPath);

    const videoInputPath = path.join(__dirname, 'example.mp4');
    const videoOutputPath = path.join(__dirname, 'example.webm'); // WebP for videos usually uses .webm extension
    await compressVideoToWebP(videoInputPath, videoOutputPath);
  } catch (error) {
    console.error('Error in compression process:', error);
  }
})();
