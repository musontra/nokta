# Nokta Forge Ledger
**Öğrenci No:** 231118016
**Track:** A (Sadelik) + C (Otonomi)

Bu dosya, `nokta-audit` üzerinden gelen `.md` raporlarının Otonom Onarım Döngüsü (Auto-Repair Loop) ile nasıl çözüldüğünü loglamak için kullanılacaktır.

## 🔄 Döngü Kuralları
`READ → LOCATE → HYPOTHESIZE → REPAIR → TEST → VERIFY → COMMIT/ROLLBACK`

---

## 📋 Gelen Raporlar ve Çözümler

### 🐛 Cycle 1: IdeaScreen Placeholder Sorunu
**READ:** `bug-report.md` okundu. Rapor: "IdeaScreen'deki metin kutusunun placeholder yazısı çok kısa. 'Fikrinizi buraya yazın...' yerine 'Harika fikrinizi detaylıca anlatın...' olarak değiştirilmeli."
**LOCATE:** `submissions/231118016-mert/app/app/screens/IdeaScreen.js`
**HYPOTHESIZE:** TextInput bileşeninin `placeholder` prop'unu değiştirmek yeterli olacaktır.
**REPAIR:** `IdeaScreen.js` dosyasındaki placeholder metni güncellendi.
**TEST:** React Native TextInput prop değişiminin render edildiği onaylandı.
**VERIFY:** "Harika fikrinizi detaylıca anlatın..." ekranda doğrulandı.
**COMMIT:** Değişiklik kalıcı olarak uygulandı (🟢 Çözüldü).

### 🐛 Cycle 2: QuestionsScreen Buton Rengi
**READ:** Rapor: "Bu ekrandaki 'İleri/Devam Et' butonunun rengi çok soluk kalmış. Arka plan rengini daha belirgin bir mavi (örneğin #3b82f6) yapalım."
**LOCATE:** `submissions/231118016-mert/app/app/screens/QuestionsScreen.js`
**HYPOTHESIZE:** `styles.button` içerisindeki `backgroundColor` değeri `#0f3460` yerine `#3b82f6` yapılmalıdır.
**REPAIR:** `QuestionsScreen.js` dosyasındaki butonun arka plan rengi `#3b82f6` yapıldı.
**TEST:** Uygulamanın stil sayfasında hata olmadan derlendiği test edildi.
**VERIFY:** İleri butonunun yeni rengi UI üzerinde doğrulandı.
**COMMIT:** Değişiklik kalıcı olarak uygulandı (🟢 Çözüldü).

### 🐛 Cycle 3: ExpertScreen Başlık ve Buton
**READ:** Rapor: "ExpertScreen'de en üstteki başlık 'Uzman Paneli' yerine 'HITL Uzman Onay Paneli' olmalı ve 'Onayla' butonunun rengi tam bir yeşil (#22c55e) yapılmalı."
**LOCATE:** `submissions/231118016-mert/app/app/screens/ExpertScreen.js`
**HYPOTHESIZE:** `headerTitle` text içeriği ve `styles.approveBtn` arka plan rengi eşzamanlı güncellenmelidir.
**REPAIR:** Başlık güncellendi ve Onayla butonunun arka plan rengi `#22c55e` olarak ayarlandı.
**TEST:** Her iki stil ve metin değişiminin component render döngüsünü bozmadığı test edildi.
**VERIFY:** Başlık ve buton rengi istenilen spesifikasyonla tam eşleşti.
**COMMIT:** Değişiklik kalıcı olarak uygulandı (🟢 Çözüldü).

---

### 🐛 Cycle 4: ExpertScreen Karanlık Mod (Dark Mode) Denemesi
**READ:** Rapor: "ExpertScreen arka planını tamamen siyah (#000000) yapalım, karanlık mod hissiyatı versin."
**LOCATE:** `submissions/231118016-mert/app/app/screens/ExpertScreen.js`
**HYPOTHESIZE:** `styles.container` içerisindeki arka plan `#000000` yapılarak karanlık mod oluşturulabilir.
**REPAIR:** Arka plan `#000000` olarak değiştirildi.
**TEST:** React Native UI üzerinde siyah arka plan oluşturulduğu görüldü.
**VERIFY:** Siyah arka plan uygulandı ANCAK içindeki tüm metinler koyu gri (`#1a1a2e`) olduğu için okunamaz hale geldi (Contrast Error). Karanlık modun tek dosyada değil global düzeyde ele alınması gerektiği doğrulandı.
**ROLLBACK:** Değişiklik UX/Açılabilirlik kurallarını ihlal ettiği için kod bir önceki kararlı haline (`#f5f7fa`) **Geri Alındı (⚠️ ROLLBACK)**.

