import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Limit increased to 10mb to handle larger JSON payloads
app.use(express.json({ limit: '10mb' }));

// Serve the uploads directory publicly
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Configure Multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'public/uploads/products');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_'));
  }
});

const upload = multer({ storage });

// Image Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Return the path where the frontend can access the image
  res.json({ 
    url: `/uploads/products/${req.file.filename}`,
    fileName: req.file.filename 
  });
});

// --- JSON DATABASE SETUP ---
const dataDir = path.join(__dirname, 'public/uploads/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// --- CMS CONFIG ENDPOINTS ---
app.get('/api/cms', (req, res) => {
  const cmsPath = path.join(dataDir, 'cmsConfig.json');
  if (fs.existsSync(cmsPath)) {
    res.sendFile(cmsPath);
  } else {
    res.json({}); // Return empty if not found, frontend will use defaults
  }
});

app.post('/api/cms', (req, res) => {
  const cmsPath = path.join(dataDir, 'cmsConfig.json');
  fs.writeFileSync(cmsPath, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// --- PRODUCTS ENDPOINTS ---
app.get('/api/products', (req, res) => {
  const productsPath = path.join(dataDir, 'products.json');
  if (fs.existsSync(productsPath)) {
    res.sendFile(productsPath);
  } else {
    res.json([]); 
  }
});

app.post('/api/products', (req, res) => {
  const productsPath = path.join(dataDir, 'products.json');
  fs.writeFileSync(productsPath, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// Serve the built React frontend
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to hand off routing to React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Update the port to use process.env.PORT for Railway compatibility
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));