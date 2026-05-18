# Mobil Uygulama Denetim Raporu (Audit Report)

**Tarih:** 14.05.2026 10:57:05

⚠️ **Toplam 7 adet düzeltilmesi gereken nokta bulundu.**

> **Coding Agent'a Talimat:** Lütfen aşağıdaki sorunları inceleyip ilgili dosyalarda gerekli refactor ve kod düzeltme işlemlerini uygula.

### 📁 Dosya: `app/screens/ExpertScreen.js`
- [ ] **Genel:** Dosya çok uzun (200 satırdan fazla). Bileşenlere bölünmesi (refactor) tavsiye edilir.
- [ ] **Satır 280:** Inline (satır içi) stil kullanımı tespit edildi. `StyleSheet.create` kullanılmalı.
  ```javascript
  <View style={{ height: 40 }} />
  ```

### 📁 Dosya: `app/screens/QuestionsScreen.js`
- [ ] **Genel:** Dosya çok uzun (200 satırdan fazla). Bileşenlere bölünmesi (refactor) tavsiye edilir.
- [ ] **Satır 106:** Inline (satır içi) stil kullanımı tespit edildi. `StyleSheet.create` kullanılmalı.
  ```javascript
  <View style={{height: 40}} />
  ```

### 📁 Dosya: `app/screens/SpecScreen.js`
- [ ] **Genel:** Dosya çok uzun (200 satırdan fazla). Bileşenlere bölünmesi (refactor) tavsiye edilir.
- [ ] **Satır 119:** Inline (satır içi) stil kullanımı tespit edildi. `StyleSheet.create` kullanılmalı.
  ```javascript
  <View style={{height: 40}} />
  ```

### 📁 Dosya: `app/utils/geminiApi.js`
- [ ] **Satır 4:** Koda unutulmuş `console.log` bırakılmış. Performans için kaldırılmalı.
  ```javascript
  console.log("Calling Gemini API URL:", url.split('?key=')[0]);
  ```

