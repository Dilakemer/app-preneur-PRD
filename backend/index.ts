import express from 'express';
import cors from 'cors';
import { seedDatabase } from './database';
import routes from './routes';
import { errorHandler } from './middleware';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*', // Tüm origin'leri kabul et (üretimde sınırlandırılmalı)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// API Rotaları
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'CareMind API Sunucusu',
    version: '1.0.0',
    endpoints: {
      araclar: '/api/araclar',
      ayarlar: '/api/ayarlar/bildirim-saati',
      raporlar: '/api/raporlar/bildirim',
      saglik: '/api/saglik-kontrol',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint bulunamadı',
    path: req.path,
  });
});

// Error handler
app.use(errorHandler);

// Sunucuyu başlat
const sunucu = app.listen(port, () => {
  console.log('\n🚀 CareMind Backend API');
  console.log(`📡 Sunucu http://localhost:${port} adresinde çalışıyor`);
  console.log(`🌐 API http://localhost:${port}/api adresinde\n`);

  // Örnek veri yükle
  seedDatabase();
  console.log('✅ Örnek veriler yüklendi\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM alındı. Sunucu kapatılıyor...');
  sunucu.close(() => {
    console.log('Sunucu kapatıldı');
    process.exit(0);
  });
});

export default app;
