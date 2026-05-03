import { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from './types';

// Error handling middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Hata:', err);

  if (err.statusCode === 404) {
    return res.status(404).json({
      success: false,
      error: 'Kaynak bulunamadı',
    } as ApiResponse<null>);
  }

  if (err.statusCode === 400) {
    return res.status(400).json({
      success: false,
      error: err.message || 'Geçersiz istek',
    } as ApiResponse<null>);
  }

  res.status(500).json({
    success: false,
    error: 'Sunucu hatası',
  } as ApiResponse<null>);
};

// Plaka validasyonu
export const validatePlaka = (plaka: string): boolean => {
  // Türk plaka formatı: 34ABC123 (2 hane + 3 harf + 4 hane)
  return /^\d{2}[A-Z]{3}\d{4}$/.test(plaka.trim().toUpperCase());
};

// Yıl validasyonu
export const validateYil = (yil: number): boolean => {
  const maxYil = new Date().getFullYear();
  return yil >= 1980 && yil <= maxYil;
};

// Tarih validasyonu (YYYY-MM-DD)
export const validateTarih = (tarih: string | null): boolean => {
  if (!tarih) return true; // Tarih opsiyonel olabilir
  return /^\d{4}-\d{2}-\d{2}$/.test(tarih);
};

// Saat validasyonu (HH:mm)
export const validateSaat = (saat: string): boolean => {
  return /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(saat);
};

// Araç input validasyonu
export const validateAracInput = (data: any): {
  valid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (!data.plaka) {
    errors.push('Plaka alanı zorunludur');
  } else if (!validatePlaka(data.plaka)) {
    errors.push('Geçersiz plaka formatı (Örnek: 34ABC123)');
  }

  if (!data.marka || typeof data.marka !== 'string') {
    errors.push('Marka alanı zorunludur');
  }

  if (!data.model || typeof data.model !== 'string') {
    errors.push('Model alanı zorunludur');
  }

  if (!data.yil || !validateYil(data.yil)) {
    errors.push(`Geçerli bir yıl girin (1980-${new Date().getFullYear()})`);
  }

  if (data.muayeneTarihi && !validateTarih(data.muayeneTarihi)) {
    errors.push('Muayene tarihi YYYY-MM-DD formatında olmalı');
  }

  if (data.sigortaTarihi && !validateTarih(data.sigortaTarihi)) {
    errors.push('Sigorta tarihi YYYY-MM-DD formatında olmalı');
  }

  if (data.kaskoTarihi && !validateTarih(data.kaskoTarihi)) {
    errors.push('Kasko tarihi YYYY-MM-DD formatında olmalı');
  }

  if (data.bakimTarihi && !validateTarih(data.bakimTarihi)) {
    errors.push('Bakım tarihi YYYY-MM-DD formatında olmalı');
  }

  if (data.bildirimler?.saat && !validateSaat(data.bildirimler.saat)) {
    errors.push('Bildirim saati HH:mm formatında olmalı');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

// Async error wrapper
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
