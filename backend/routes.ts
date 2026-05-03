import { Router, Request, Response } from 'express';
import {
  getAllAraclar,
  getAracById,
  createArac,
  updateArac,
  deleteArac,
  deleteAllAraclar,
  getVarsayilanBildirimSaati,
  setVarsayilanBildirimSaati,
  getAracByPlaka,
  generateBildirimRaporu,
} from './database';
import { asyncHandler, validateAracInput, validateSaat } from './middleware';
import type { ApiResponse, Arac, AracInput } from './types';

const router = Router();

// ============ ARAÇLAR API ============

// GET /api/araclar - Tüm araçları getir
router.get('/araclar', asyncHandler(async (req: Request, res: Response) => {
  const araclar = getAllAraclar();
  res.json({
    success: true,
    data: araclar,
    message: `${araclar.length} araç bulundu`,
  } as ApiResponse<Arac[]>);
}));

// GET /api/araclar/:id - ID ile araç getir
router.get('/araclar/:id', asyncHandler(async (req: Request, res: Response) => {
  const arac = getAracById(req.params.id);

  if (!arac) {
    return res.status(404).json({
      success: false,
      error: 'Araç bulunamadı',
    } as ApiResponse<null>);
  }

  res.json({
    success: true,
    data: arac,
  } as ApiResponse<Arac>);
}));

// GET /api/araclar/plaka/:plaka - Plaka ile araç getir
router.get('/araclar/plaka/:plaka', asyncHandler(async (req: Request, res: Response) => {
  const arac = getAracByPlaka(req.params.plaka);

  if (!arac) {
    return res.status(404).json({
      success: false,
      error: 'Araç bulunamadı',
    } as ApiResponse<null>);
  }

  res.json({
    success: true,
    data: arac,
  } as ApiResponse<Arac>);
}));

// POST /api/araclar - Yeni araç ekle
router.post('/araclar', asyncHandler(async (req: Request, res: Response) => {
  const validation = validateAracInput(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      error: 'Validasyon hatası',
      message: validation.errors.join(', '),
    } as ApiResponse<null>);
  }

  // Aynı plaka ile araç var mı kontrol et
  if (getAracByPlaka(req.body.plaka)) {
    return res.status(400).json({
      success: false,
      error: 'Bu plakaya sahip bir araç zaten mevcut',
    } as ApiResponse<null>);
  }

  try {
    const yeniArac = createArac(req.body as AracInput);
    res.status(201).json({
      success: true,
      data: yeniArac,
      message: 'Araç başarıyla eklendi',
    } as ApiResponse<Arac>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Araç eklenirken hata oluştu',
    } as ApiResponse<null>);
  }
}));

// PUT /api/araclar/:id - Araç güncelle
router.put('/araclar/:id', asyncHandler(async (req: Request, res: Response) => {
  const validation = validateAracInput(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      error: 'Validasyon hatası',
      message: validation.errors.join(', '),
    } as ApiResponse<null>);
  }

  const mevcut = getAracById(req.params.id);
  if (!mevcut) {
    return res.status(404).json({
      success: false,
      error: 'Araç bulunamadı',
    } as ApiResponse<null>);
  }

  // Aynı plaka başka bir araçta mı var kontrol et
  if (req.body.plaka && req.body.plaka !== mevcut.plaka) {
    if (getAracByPlaka(req.body.plaka)) {
      return res.status(400).json({
        success: false,
        error: 'Bu plakaya sahip başka bir araç zaten mevcut',
      } as ApiResponse<null>);
    }
  }

  const guncelArac = updateArac(req.params.id, req.body);

  if (!guncelArac) {
    return res.status(500).json({
      success: false,
      error: 'Araç güncellenirken hata oluştu',
    } as ApiResponse<null>);
  }

  res.json({
    success: true,
    data: guncelArac,
    message: 'Araç başarıyla güncellendi',
  } as ApiResponse<Arac>);
}));

// DELETE /api/araclar/:id - Araç sil
router.delete('/araclar/:id', asyncHandler(async (req: Request, res: Response) => {
  const silinmiş = deleteArac(req.params.id);

  if (!silinmiş) {
    return res.status(404).json({
      success: false,
      error: 'Araç bulunamadı',
    } as ApiResponse<null>);
  }

  res.json({
    success: true,
    data: silinmiş,
    message: 'Araç başarıyla silindi',
  } as ApiResponse<Arac>);
}));

// ============ AYARLAR API ============

// GET /api/ayarlar/bildirim-saati - Varsayılan bildirim saatini getir
router.get('/ayarlar/bildirim-saati', asyncHandler(async (req: Request, res: Response) => {
  const saat = getVarsayilanBildirimSaati();
  res.json({
    success: true,
    data: { saat },
  } as ApiResponse<{ saat: string }>);
}));

// PUT /api/ayarlar/bildirim-saati - Varsayılan bildirim saatini güncelle
router.put('/ayarlar/bildirim-saati', asyncHandler(async (req: Request, res: Response) => {
  const { saat } = req.body;

  if (!saat || typeof saat !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Saat parametresi zorunludur',
    } as ApiResponse<null>);
  }

  if (!/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(saat)) {
    return res.status(400).json({
      success: false,
      error: 'Geçersiz saat formatı (HH:mm kullanınız)',
    } as ApiResponse<null>);
  }

  setVarsayilanBildirimSaati(saat);

  res.json({
    success: true,
    data: { saat },
    message: 'Bildirim saati güncellendi',
  } as ApiResponse<{ saat: string }>);
}));

// ============ RAPORLAR API ============

// GET /api/raporlar/bildirim - Bildirim raporunu getir
router.get('/raporlar/bildirim', asyncHandler(async (req: Request, res: Response) => {
  const rapor = generateBildirimRaporu();

  const yakinda = rapor.filter(r => r.kalanGun > 0 && r.kalanGun <= 30).length;
  const uyarida = rapor.filter(r => r.kalanGun > 0 && r.kalanGun <= 7).length;
  const gecikmiş = rapor.filter(r => r.kalanGun < 0).length;

  res.json({
    success: true,
    data: {
      rapor,
      ozet: {
        toplamArac: getAllAraclar().length,
        yakinda,
        uyarida,
        gecikmiş,
      },
    },
  } as ApiResponse<any>);
}));

// ============ YÖNETİM API ============

// DELETE /api/yonetim/tum-veriler - Tüm verileri sil
router.delete('/yonetim/tum-veriler', asyncHandler(async (req: Request, res: Response) => {
  deleteAllAraclar();

  res.json({
    success: true,
    message: 'Tüm veriler başarıyla silindi',
  } as ApiResponse<null>);
}));

// GET /api/saglik-kontrol - Sunucu sağlık kontrolü
router.get('/saglik-kontrol', asyncHandler(async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Sunucu çalışıyor',
    data: {
      status: 'online',
      timestamp: new Date().toISOString(),
      aracSayisi: getAllAraclar().length,
    },
  } as ApiResponse<any>);
}));

export default router;
