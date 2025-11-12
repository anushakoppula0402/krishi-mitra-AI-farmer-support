import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import sharp from 'sharp';

// Ensure uploads directory exists
const uploadDir = 'uploads';
const conversationsDir = path.join(uploadDir, 'conversations');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

if (!fs.existsSync(conversationsDir)) {
  fs.mkdirSync(conversationsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const conversationId = req.params.conversationId || 'temp';
    const destPath = path.join(conversationsDir, conversationId);
    
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    
    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  }
});

// File filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed.'));
  }
};

// Configure multer
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Maximum 5 files per request
  }
});

// Image processing middleware
export const processImage = async (req: Request, res: any, next: any) => {
  try {
    if (!req.file) {
      return next();
    }

    const inputPath = req.file.path;
    const outputPath = inputPath.replace(/\.[^/.]+$/, '_processed.webp');

    // Process image with sharp
    await sharp(inputPath)
      .resize(1024, 1024, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ quality: 85 })
      .toFile(outputPath);

    // Replace original file with processed version
    fs.unlinkSync(inputPath);
    req.file.path = outputPath;
    req.file.filename = path.basename(outputPath);
    req.file.mimetype = 'image/webp';

    next();
  } catch (error) {
    console.error('Image processing error:', error);
    next(error);
  }
};

// Helper function to convert file to base64
export const fileToBase64 = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const base64 = data.toString('base64');
        resolve(base64);
      }
    });
  });
};

// Helper function to delete file
export const deleteFile = (filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err && err.code !== 'ENOENT') {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Helper function to create directory if it doesn't exist
export const ensureDirectory = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Cleanup old files (can be called periodically)
export const cleanupOldFiles = (daysOld: number = 30): void => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  const scanDirectory = (dirPath: string) => {
    if (!fs.existsSync(dirPath)) return;

    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        scanDirectory(filePath);
        
        // Remove empty directories
        const remaining = fs.readdirSync(filePath);
        if (remaining.length === 0) {
          fs.rmdirSync(filePath);
        }
      } else if (stats.mtime < cutoffDate) {
        fs.unlinkSync(filePath);
        console.log(`Cleaned up old file: ${filePath}`);
      }
    });
  };

  scanDirectory(uploadDir);
};