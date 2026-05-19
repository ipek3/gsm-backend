#  GSM Backend API Server (Express.js + Oracle)

## Backend Genel Yapısı

Bu dosya, GSM servis yönetim sisteminin backend katmanını oluşturmaktadır.  
Node.js ve Express.js kullanılarak geliştirilmiştir.

Backend tarafı aşağıdaki görevlerden sorumludur:

- API endpoint yönetimi
- Oracle Database bağlantısı
- Kullanıcı giriş doğrulaması
- Servis listeleme işlemleri
- Servis satın alma işlemleri
- Hata yönetimi ve response kontrolü

---

##  Kullanılan Teknolojiler

- Node.js
- Express.js
- OracleDB Driver
- CORS Middleware
- REST API mimarisi

---



### CORS Yapılandırması
Frontend uygulamasının backend ile haberleşebilmesi için CORS yapılandırılmıştır.

İzin verilen işlemler:
- GET
- POST
- PUT
- DELETE

Frontend bağlantısı localhost üzerinden yönetilmektedir.

---

### JSON Parsing

Express.json middleware’i kullanılarak gelen request body verileri JSON formatında okunabilir hale getirilmiştir.

---



##  Base Endpoint

Ana endpoint backend servisinin çalışıp çalışmadığını kontrol etmek amacıyla oluşturulmuştur.

Bu endpoint:
- Sunucunun aktif olduğunu doğrular
- Test amacıyla kullanılabilir

---

##  Login Endpoint

Bu endpoint kullanıcı giriş işlemini yönetmektedir.

### İş Akışı

1. Kullanıcı frontend üzerinden username ve password gönderir
2. Backend Oracle Database bağlantısı kurar
3. Oracle stored procedure çalıştırılır
4. Kullanıcı doğrulaması yapılır
5. Sonuç frontend’e JSON response olarak döndürülür

### Özellikler

- Async/await yapısı kullanılmıştır
- Başarılı ve başarısız giriş senaryoları yönetilmektedir
- Hata durumunda kullanıcıya server error response dönülmektedir

---

##  Purchase Service Endpoint

Bu endpoint servis satın alma işlemini yönetmektedir.

### İş Akışı

1. Frontend servis ID bilgisini gönderir
2. Backend Oracle bağlantısı kurar
3. Purchase procedure çalıştırılır
4. Satın alma işlemi veritabanına kaydedilir
5. Sonuç kullanıcıya döndürülür

### Özellikler

- Stored procedure kullanımı
- JSON response sistemi
- Error handling yapısı
- Database connection yönetimi

---

##  Services Endpoint

Bu endpoint aktif servislerin listelenmesini sağlar.

### Yapılan İşlemler

- Oracle Database üzerinden servis verileri çekilir
- Sadece ACTIVE durumundaki servisler listelenir
- Servis bilgileri JSON formatında frontend’e gönderilir

### Dönen Veriler

- Service ID
- Service Type
- Price
- Status

---

##  Oracle Database Entegrasyonu

Backend tarafında OracleDB driver kullanılmıştır.

### Veritabanı İşlemleri

- Connection açma/kapatma
- Stored procedure çağrıları


##  Error Handling Yapısı

Tüm endpoint’lerde try/catch/finally blokları kullanılmıştır.

Bu yapı sayesinde:
- Sistem çökmesi engellenmiştir
- Kullanıcıya anlamlı hata mesajları dönülmüştür
- Backend log takibi kolaylaştırılmıştır

---

## Backend Tarafında Kazanılan Deneyimler

Bu proje sayesinde aşağıdaki konularda pratik yapılmıştır:

- REST API geliştirme
- Express middleware yapısı
- Oracle Database entegrasyonu
- Stored procedure kullanımı
- Async backend geliştirme
- Error handling yönetimi
- Frontend-backend iletişimi
- JSON response mimarisi

---

##  Sonuç

Bu backend yapısı, temel seviyede gerçek dünya telekom servis yönetim sistemini simüle etmek amacıyla geliştirilmiştir.

Proje sayesinde:
- Full-stack mimari mantığı
- API geliştirme süreçleri
- Oracle veritabanı entegrasyonu
- Backend servis yönetimi

konularında uygulamalı deneyim kazanılmıştır.
