# CaReminder — Muayene & Sigorta Takip Uygulaması

## Proje Hedefi
Türkiye'deki araç sahiplerinin muayene, sigorta, kasko ve bakım tarihlerini kolayca takip edebilmesini sağlayan mobil uygulama. Backend ile anlık senkronize çalışırken, çevrimdışı kullanım için de AsyncStorage ile donatılmıştır.

## MVP Özellikleri
- Araç ekleme, düzenleme, silme (Backend senkronizasyonu)
- Çevrimdışı kullanım desteği (AsyncStorage Fallback)
- Kritik tarihler için bildirimler (60 ve 30 gün kala)
- Sigorta teklif ekranı (affiliate link)

## Uygulama Görselleri

<div align="center">
  <h3>Ana Sayfa (Dashboard)</h3>
  <img src="screenshoots/dashboard.png" width="300" alt="Ana Sayfa">
  <p><i>Araç listenizi ve yaklaşan kritik tarihleri tek bakışta görün.</i></p>

  <br>

  <h3>Araç Detayları</h3>
  <img src="screenshoots/detail.png" width="300" alt="Araç Detay">
  <p><i>Muayene, sigorta ve bakım detaylarını inceleyin, aksiyon alın.</i></p>

  <br>

  <h3>Yeni Araç Ekleme</h3>
  <img src="screenshoots/add_vehicle.png" width="300" alt="Araç Ekleme">
  <p><i>Kolay ve hızlı bir şekilde yeni aracınızı sisteme dahil edin.</i></p>

  <br>

  <h3>Raporlar ve Analiz</h3>
  <img src="screenshoots/reports.png" width="300" alt="Raporlar">
  <p><i>Harcama analizi ve tasarruf istatistiklerinizi takip edin.</i></p>

  <br>

  <h3>Ayarlar</h3>
  <img src="screenshoots/settings.png" width="300" alt="Ayarlar">
  <p><i>Bildirim ve uygulama tercihlerini kişiselleştirin.</i></p>
</div>

## Teknoloji Yığını
- React Native 0.73+ (Expo SDK 50+)
- TypeScript
- Node.js & Express (Backend)
- AsyncStorage (Yerel Depolama & Çevrimdışı Mod)
- React Navigation v6
- expo-notifications
- date-fns
- NativeWind (Tailwind CSS for RN)

## Backend ve Frontend Bağlantısı

Projenin backend (Node.js/Express) modülleri tamamlanmış ve frontend ile tam entegre çalışacak duruma getirilmiştir. 
Frontend uygulaması, `fetch` API kullanarak backend ile haberleşmektedir. Eğer sunucuya erişim yoksa (çevrimdışı durum) `AsyncStorage` devreye girer ve veriler yerel olarak saklanmaya devam eder. Böylece veri kaybı yaşanmadan %100 offline kullanım sağlanır.

### Backend API Endpointleri (api/):
- `GET    /araclar`   → Tüm araçları getir
- `POST   /araclar`   → Yeni araç ekle
- `PUT    /araclar/:id` → Araç güncelle
- `DELETE /araclar/:id` → Araç sil
- `PUT    /ayarlar/bildirim-saati` → Bildirim saati güncelle

### Geliştirme ve Çalıştırma Talimatları

Proje iki ana klasörden oluşuyor: `frontend/` (mobil) ve `backend/` (API).

**1. Backend'i Başlatmak (Proje Ana Dizininden):**
```bash
# Projenin root klasöründe:
npm install
npm run dev
# Sunucu http://localhost:3001 adresinde başlar
```

**2. Frontend'i Başlatmak:**
```bash
cd frontend
npm install
npm start
# veya npm run start:lan
```

## Expo Go Sorun Giderme
- iPhone'da `Settings > Expo Go > Local Network` izninin açık olduğundan emin olun.
- Bilgisayar ve telefon aynı Wi-Fi ağına bağlı olmalı; VPN / Private Relay kapalı olmalı.
- `npm run start:lan` çalışırken QR `exp://192.168.x.x:PORT` biçiminde görünür; bu adres telefonunuzdan erişilebilir olmalı.
- Uygulama açılmazsa Metro terminalindeki adresi kontrol edin ve gerekiyorsa yeniden başlatın.
- Backend bağlantısı için IP adresinizi `.env` dosyasına (örneğin `EXPO_PUBLIC_API_URL=http://192.168.x.x:3001/api`) ekleyerek gerçek cihazlarda sunucuya erişebilirsiniz.

Her aşama tamamlandıkça bu dosya güncellenecektir.
