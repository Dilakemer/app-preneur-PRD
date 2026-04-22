# CaRemind — Muayene & Sigorta Takip Uygulaması

## Proje Hedefi
Türkiye'deki araç sahiplerinin muayene, sigorta, kasko ve bakım tarihlerini kolayca takip edebilmesini sağlayan, tamamen çevrimdışı çalışan bir mobil uygulama.

## MVP Özellikleri
- Araç ekleme, düzenleme, silme
- Kritik tarihler için bildirimler (60 ve 30 gün kala)
- Sigorta teklif ekranı (affiliate link)
- Tüm veriler cihazda, backend yok

## Teknoloji Yığını
- React Native 0.73+ (Expo SDK 50+)
- TypeScript
- React Navigation v6
- AsyncStorage
- expo-notifications
- date-fns
- NativeWind (Tailwind CSS for RN)

## Klasör Yapısı (Planlanan)
- app/
- components/
- services/
- hooks/
- types/
- utils/
- constants/
- assets/

## Geliştirme Aşamaları
1. Proje kurulumu ve temel yapılandırma
2. Navigasyon ve ekran iskeletleri
3. Veri modeli ve servisler
4. Bildirim entegrasyonu
5. UI/UX ve testler

## Postman ve API Testleri Hakkında

## Backend ve API Testleri

Artık basit bir Node.js/Express backend ile araçlar için CRUD işlemleri yapılabilir. Tüm endpointler in-memory çalışır.

### API Endpointleri
- `GET    /araclar`   → Tüm araçları getir
- `POST   /araclar`   → Yeni araç ekle
- `PUT    /araclar/:id` → Araç güncelle
- `DELETE /araclar/:id` → Araç sil

### Postman ile Test
1. Sunucuyu başlat: `cd backend && npx ts-node-dev src/index.ts`
2. Postman'da aşağıdaki istekleri kullan:
	- GET  `http://localhost:3001/araclar`
	- POST `http://localhost:3001/araclar` (JSON body ile)
	- PUT  `http://localhost:3001/araclar/{id}`
	- DELETE `http://localhost:3001/araclar/{id}`

Daha fazla örnek ve test için `backend/API_TEST.md` dosyasına bakabilirsiniz.

## Aşama 1: Proje Kurulumu

Her aşama tamamlandıkça bu dosya güncellenecektir.
